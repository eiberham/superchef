import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { trace, SpanStatusCode } from '@opentelemetry/api';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  log(message: any, context?: string) {
    this.recordEvent('info', message, context);
    super.log(message, context);
  }

  error(message: any, stack?: string, context?: string) {
    this.recordEvent('error', message, context, stack);
    super.error(message, stack, context);
  }

  warn(message: any, context?: string) {
    this.recordEvent('warn', message, context);
    super.warn(message, context);
  }

  private recordEvent(
    level: string,
    message: any,
    context?: string,
    stack?: string,
  ) {
    const span = trace.getActiveSpan();
    if (span) {
      span.addEvent(typeof message === 'string' ? message : 'log', {
        'log.level': level,
        'log.message': JSON.stringify(message),
        'log.context': context || this.context,
        'log.stack': stack,
      });

      if (level === 'error') {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: String(message),
        });
      }
    }
  }
}
