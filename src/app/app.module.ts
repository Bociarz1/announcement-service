import {MiddlewareConsumer, Module} from '@nestjs/common';
import * as process from "process";
import {MongooseModule} from "@nestjs/mongoose";
import {AnnouncementsModule} from "./modules/announcements/announcements.module";
import {UserModule} from "./modules/user/user.module";
import {HeartbeatModule} from "./modules/heartbeat/heartbeat.module";
import {DebugMiddleware} from "../core/middlewares/debug.middleware";
import {ErrorNotFoundFilter} from "../core/filters/errorNotFound.filter";
import {APP_FILTER} from "@nestjs/core";
import {ErrorLoggerMiddleware} from "../core/middlewares/error-logger.middleware";

require('dotenv').config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        AnnouncementsModule,
        UserModule,
        HeartbeatModule
    ],
    controllers: [],
    providers: [{provide: APP_FILTER, useClass: ErrorNotFoundFilter}],
})
export class AppModule {
    private isDebug = process.argv.includes('debug')

    configure(consumer: MiddlewareConsumer) {
        this.isDebug ? consumer.apply(DebugMiddleware).forRoutes('*') : '';
        consumer.apply(ErrorLoggerMiddleware).forRoutes('*');
    }
}
