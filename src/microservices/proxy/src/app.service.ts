import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private requestCounter = 0;

  migration(): boolean {
    const percent = Number(process.env.MOVIES_MIGRATION_PERCENT || 0);

    if (percent <= 0) return false;
    if (percent >= 100) return true;

    const g = this.gcd(percent, 100);
    const bucketSize = 100 / g;
    const moviesCount = percent / g;

    const idx = this.requestCounter++ % bucketSize;
    return idx < moviesCount;
  }

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  async getMovies(): Promise<any> {
    const isMigration = this.migration();
    const url = new URL((isMigration ? process.env.MOVIES_SERVICE_URL : process.env.MONOLITH_URL) + '/api/movies');
    console.log(url.href);
    const response = await fetch(url.href, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`${isMigration ? 'Movies' : 'Monolith'} error: ${response.status}`);
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
