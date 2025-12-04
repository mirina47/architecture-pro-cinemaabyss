import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async emitEvent(topic: string, data: any) {
    console.log(`Sending to Kafka: topic=${topic}`, data);
    return this.kafkaClient.emit(topic, data);
  }
}
