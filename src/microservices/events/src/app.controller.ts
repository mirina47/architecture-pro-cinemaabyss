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
  async createMovieEvent(@Body() dto: any): Promise<any> {
    console.log('movie', dto);
    await this.appService.emitEvent('movie-events', dto);
    return { status: 'success' };
  }

  @Post('user')
  async createUserEvent(@Body() dto: any): Promise<any> {
    console.log('user', dto);
    await this.appService.emitEvent('user-events', dto);
    return { status: 'success' };
  }

  @Post('payment')
  async createPaymentEvent(@Body() dto: any): Promise<any> {
    console.log('payment', dto);
    await this.appService.emitEvent('payment-events', dto);
    return { status: 'success' };
  }
}
