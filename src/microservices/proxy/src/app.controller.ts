import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth(): Promise<any> {
    return { status: true };
  }

  @Get('api/movies')
  async getMovies(): Promise<any> {
    return await this.appService.getMovies();
  }

  @Get('api/users')
  async getUsers(): Promise<any> {
    return await this.appService.getUsers();
  }
}
