import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/events')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth(): Promise<any> {
    return { status: true };
  }

  @Post('movie')
  async createMovieEvent(@Req() req): Promise<any> {
    const dto = req.rawBody || '';
    console.log('movie dto', dto);
    await this.appService.emitEvent('movie-events', dto);
    return { status: 'success' };
  }

  @Post('user')
  async createUserEvent(@Req() req): Promise<any> {
    const dto = req.rawBody || '';
    console.log('user dto', dto);
    await this.appService.emitEvent('user-events', dto);
    return { status: 'success' };
  }

  @Post('payment')
  async createPaymentEvent(@Req() req): Promise<any> {
    const dto = req.rawBody || '';
    console.log('payment dto', dto);
    await this.appService.emitEvent('payment-events', dto);
    return { status: 'success' };
  }
}
