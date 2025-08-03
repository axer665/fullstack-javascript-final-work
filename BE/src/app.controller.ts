import { ServiceApp } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appService: ServiceApp) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
