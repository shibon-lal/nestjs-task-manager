import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ControllerResponse<T = unknown> {
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp?: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  ControllerResponse<T>,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ControllerResponse<T>>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((response) => ({
        success: true,
        message: response.message ?? 'Success',
        data: response.data,
        meta: response.meta,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
