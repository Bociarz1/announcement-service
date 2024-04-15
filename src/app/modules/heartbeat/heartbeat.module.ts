import {Module} from '@nestjs/common';
import {HeartbeatService} from './services/heartbeat.service';
import {HeartbeatController} from './controllers/heartbeat.controller';

@Module({
    controllers: [HeartbeatController],
    providers: [HeartbeatService],
})
export class HeartbeatModule {
}
