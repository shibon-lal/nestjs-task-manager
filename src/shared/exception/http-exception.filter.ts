import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Request failed';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const msg = exceptionResponse.message;
      message = Array.isArray(msg) ? msg[0] : msg;
    }

    response.status(status).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
