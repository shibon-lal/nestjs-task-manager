import { Public } from '@/shared/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  constructor() {}

  @Get('/health')
  @Public()
  check() {
    console.log('hello world');
    return true;
  }
}
