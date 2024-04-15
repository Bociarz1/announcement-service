import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {ValidationPipe} from "@nestjs/common";

export async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({transform: true}));
    await app.listen(3000);
}

bootstrap();
