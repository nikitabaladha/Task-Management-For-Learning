import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface ErrorResponse {
  success: false;
  message: string | string[];
  data: null;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse: string | object = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        'message' in exceptionResponse &&
        (typeof exceptionResponse.message === 'string' ||
          (Array.isArray(exceptionResponse.message) &&
            exceptionResponse.message.every(
              (item: unknown): item is string => typeof item === 'string',
            )))
      ) {
        message = exceptionResponse.message;
      }
    }

    const errorResponse: ErrorResponse = {
      success: false,
      message,
      data: null,
    };

    response.status(statusCode).json(errorResponse);
  }
}
