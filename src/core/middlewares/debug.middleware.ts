import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import * as fs from 'fs';

@Injectable()
export class DebugMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const timestamp: string = new Date().toISOString();
        const method: string = req.method;
        const url: string = req.originalUrl;
        const logMessage: string = `${timestamp} | ${method} ${url}`;
        fs.appendFileSync('requests.log.txt', logMessage + '\n');
        next();
    }
}