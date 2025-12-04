import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  @EventPattern('user-events')
  consumeUserEvent(@Payload() payload: any) {
    console.log('User event received:', payload);
  }

  @EventPattern('movie-events')
  consumeMovieEvent(@Payload() payload: any) {
    console.log('Movie event received:', payload);
  }

  @EventPattern('payment-events')
  consumePaymentEvent(@Payload() payload: any) {
    console.log('Payment event received:', payload);
  }
}
