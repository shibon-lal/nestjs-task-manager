import { ConflictException } from '@nestjs/common';

export class ApiException extends ConflictException {
  constructor(field: string, message: string) {
    super({
      success: false,
      message: 'Validation failed',
      errors: {
        [field]: message,
      },
    });
  }
}
