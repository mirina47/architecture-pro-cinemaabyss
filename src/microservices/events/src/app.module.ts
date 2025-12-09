import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsConsumer } from './kafka.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['kafka:9092'] },
          consumer: { groupId: 'events-service-group' },
        },
      },
    ]),
  ],
  controllers: [AppController, EventsConsumer],
  providers: [AppService],
})
export class AppModule {}
