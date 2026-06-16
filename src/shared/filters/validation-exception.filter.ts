import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const response = exception.getResponse() as any;

    const message = response.message;

    const errors: Record<string, string> = {};

    if (Array.isArray(message)) {
      message.forEach((msg: string) => {
        const [field, error] = msg.split(' ');

        if (!errors[field]) {
          errors[field] = error;
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }
}
