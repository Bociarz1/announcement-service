import {Controller, Get} from '@nestjs/common';
import {HeartbeatService} from '../services/heartbeat.service';

@Controller('heartbeat')
export class HeartbeatController {
    constructor(private readonly heartbeatService: HeartbeatService) {
    }

    @Get()
    public getCurrentDate(): string {
        return this.heartbeatService.getCurrentDate();
    }
}
