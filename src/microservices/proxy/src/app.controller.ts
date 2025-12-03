import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth(): Promise<boolean> {
    return true;
  }

  @Get('api/movies')
  async getMovies(): Promise<boolean> {
    return await this.appService.getMovies();
  }

  @Get('api/users')
  async getUsers(): Promise<boolean> {
    return await this.appService.getUsers();
  }
}
