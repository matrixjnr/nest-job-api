import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): any {
    const data = {
      message: 'Welcome to Free Jobs API v1.0.0',
    };
    return data;
  }
}
