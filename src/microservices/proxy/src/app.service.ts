import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getMovies(): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
    };
    const url = new URL(process.env.MONOLITH_URL + '/api/movies');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Monolith error: ${response.status}`);
    }
    return response.json();
  }

  async getUsers(): Promise<any> {
    const requestOptions: RequestInit = {
      method: 'GET',
    };
    const url = new URL(process.env.MONOLITH_URL + '/api/users');
    const response = await fetch(url.href, requestOptions);
    if (!response.ok) {
      throw new Error(`Monolith error: ${response.status}`);
    }
    return response.json();
  }
}
