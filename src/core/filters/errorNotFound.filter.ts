import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException} from '@nestjs/common';
import {Request, Response} from 'express';
import * as path from "path";
import {HttpArgumentsHost} from "@nestjs/common/interfaces";

@Catch(NotFoundException)
export class ErrorNotFoundFilter implements ExceptionFilter {
    public catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status: number = exception.getStatus();
        if (status === HttpStatus.NOT_FOUND) {
            const imagePath: string = path.resolve(__dirname, '../../../static/notFoundImg.webp');
            response.sendFile(imagePath);
        }
    }
}
