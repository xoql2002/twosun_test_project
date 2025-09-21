import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : null;

        let message: string;

        if (typeof errorResponse === 'string') {
            message = errorResponse;
        } else if (
            errorResponse &&
            typeof errorResponse === 'object' &&
            (errorResponse as any).message
        ) {
            message = (errorResponse as any).message;
        } else {
            message = '서버 내부 오류가 발생했습니다.';
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            error: exception instanceof HttpException ? exception.name : 'InternalServerError',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}