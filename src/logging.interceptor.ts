import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger.winston-loki';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (context.getType() === 'http') {
            return this.logHttpCall(context, next);
        }
        return next.handle();
    }

    private logHttpCall(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || '';
        const { ip, method, path: url } = request;
        const correlationKey = uuidv4();
        const userId = request.user?.userId;

        // Log the incoming request
        logger.info({
            level: 'info',
            correlationKey,
            message: `Incoming Request: ${method} ${url}`,
            userId,
            userAgent,
            ip,
            className: context.getClass().name,
            handlerName: context.getHandler().name,
        });

        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;
                const contentLength = response.get('content-length');

                // Log the successful response
                // logger.info({
                //     // level: 'info',
                //     correlationKey,
                //     message: `Request Completed: ${method} ${url}`,
                //     statusCode,
                //     contentLength,
                //     duration: `${Date.now() - now}ms`,
                // });
            }),
            catchError((err) => {
                // Log the error
                logger.error({
                    // level: 'error',
                    correlationKey,
                    message: `Request Failed: ${method} ${url}`,
                    error: err.message,
                    stack: err.stack,
                });
                throw err; // Re-throw the error after logging
            }),
        );
    }
}
