import { Global, Module, OnModuleInit, Inject } from '@nestjs/common';
import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';

@Global() // Makes the module available globally
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
            clientId: 'superchef-api',
          },
          consumer: {
            groupId: 'api-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule], // Export the module so others can use it
})
export class KafkaModule implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafka: ClientKafka) {}

  async onModuleInit() {

    const patterns = ['get.top.recipes']

    patterns.forEach(pattern => {
      this.kafka.subscribeToResponseOf(pattern)
    })

    await this.kafka.connect()
    console.log('✅ Kafka infrastructure initialized')
  }
}