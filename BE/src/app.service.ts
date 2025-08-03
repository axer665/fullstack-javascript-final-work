import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceApp {
  getHello(): string {
    return 'Hello World!';
  }
}
