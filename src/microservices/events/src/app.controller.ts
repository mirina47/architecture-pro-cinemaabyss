import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/events')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth(): Promise<any> {
    return { status: true };
  }

  @Post('movie')
  async createMovieEvent(@Body() dto: { movie_id: number; title: string; action: string; user_id: number }): Promise<any> {
    await this.appService.emitEvent('movie-events', dto);
    return { status: 'success' };
  }

  @Post('user')
  async createUserEvent(@Body() dto: { user_id: number; username: string; action: string; timestamp: Date }): Promise<any> {
    await this.appService.emitEvent('user-events', dto);
    return { status: 'success' };
  }

  @Post('payment')
  async createPaymentEvent(@Body() dto: { payment_id: number; user_id: number; amount: number; status: string; timestamp: Date; method_type: string }): Promise<any> {
    await this.appService.emitEvent('payment-events', dto);
    return { status: 'success' };
  }
}
