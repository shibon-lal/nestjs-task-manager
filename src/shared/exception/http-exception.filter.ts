import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse() as any;

    let message = 'Request failed';
    let errors: Record<string, string> | null = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse) {
      // NestJS ValidationPipe sends message as an array of strings
      if (Array.isArray(exceptionResponse.message)) {
        message = 'Validation failed';
        errors = exceptionResponse.message.reduce(
          (acc: Record<string, string>, err: string, index: number) => {
            // err is usually "title should not be empty" — split on first space
            const spaceIndex = err.indexOf(' ');
            const field =
              spaceIndex !== -1
                ? err.substring(0, spaceIndex)
                : `error_${index + 1}`;
            acc[field] = err;
            return acc;
          },
          {},
        );
      } else {
        message = exceptionResponse.message ?? message;
      }

      // Handle explicit errors object
      if (exceptionResponse.errors) {
        const rawErrors = exceptionResponse.errors;

        if (typeof rawErrors === 'object' && !Array.isArray(rawErrors)) {
          // Already key-value: { title: "name should not be empty" }
          errors = rawErrors;
        } else if (Array.isArray(rawErrors)) {
          // Array of strings → extract field from message
          errors = rawErrors.reduce(
            (acc: Record<string, string>, err: string, index: number) => {
              const spaceIndex = err.indexOf(' ');
              const field =
                spaceIndex !== -1
                  ? err.substring(0, spaceIndex)
                  : `error_${index + 1}`;
              acc[field] = err;
              return acc;
            },
            {},
          );
        } else {
          errors = { error: String(rawErrors) };
        }
      }
    }

    response.status(status).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
