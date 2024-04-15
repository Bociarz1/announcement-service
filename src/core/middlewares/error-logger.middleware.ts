import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {NOT_ERROR_STATUSES} from "../consts/notErrorStatuses.const";

@Injectable()
export class ErrorLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const timestamp: string = new Date().toISOString();
        const method: string = req.method;
        const url: string = req.originalUrl;

        res.on('finish', () => {
            if (!NOT_ERROR_STATUSES.includes(res.statusCode)) {
                const message: string = res.statusMessage;
                const logMessage: string = `${timestamp} | ${method} ${url} | ${message}`;
                console.log(logMessage);
            }
        });
        next();
    }
}