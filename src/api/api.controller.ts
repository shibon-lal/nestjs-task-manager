import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  constructor() {}

  @Get('/health')
  check() {
    console.log('hello world');
    return true;
  }
}
