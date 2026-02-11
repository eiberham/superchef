import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RmqErrorFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(RmqErrorFilter.name);
  private readonly RETRY_LIMIT = 3;

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const context = host.switchToRpc().getContext<RmqContext>();
    const channel = context.getChannelRef();
    const message = context.getMessage();

    this.logger.error('Failed to send email:', exception.message);
    // IMPORTANTE: En RabbitMQ, el conteo de muertes se guarda en 'x-death'
    const deathCount = message.properties.headers['x-death']?.[0]?.count || 0;

    if (deathCount < this.RETRY_LIMIT) {
      // Rechazamos SIN requeue para que RabbitMQ lo mande al DLX.
      // Si el DLX apunta a la MISMA cola, esto puede simular un reintento
      // (pero ojo con los bucles infinitos).
      // Lo más estándar es mandarlo a la DLQ y listo.

      channel.nack(message, false, false);
    } else {
      this.logger.error('Max retries reached via DLQ logic');

      // Publicamos el mensaje en el exchange pero con una routing key que NO lo devuelva aquí
      // Si tienes la cola "dead_letter_queue" vinculada a 'dead_letter_final', úsala:
      const finalRoutingKey = 'dead_letter_final';

      channel.publish(
        'dead_letter_exchange',
        finalRoutingKey,
        message.content,
        { headers: message.properties.headers },
      );

      channel.ack(message);
    }

    return throwError(() => exception);
  }
}
