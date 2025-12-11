import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  @EventPattern('user-events')
  consumeUserEvent(@Payload() payload: any) {
    console.log('Received from Kafka: topic=user-events', payload);
  }

  @EventPattern('movie-events')
  consumeMovieEvent(@Payload() payload: any) {
    console.log('Received from Kafka: topic=movie-events', payload);
  }

  @EventPattern('payment-events')
  consumePaymentEvent(@Payload() payload: any) {
    console.log('Received from Kafka: topic=payment-events', payload);
  }
}
