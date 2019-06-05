import { Controller, Post, Body } from '@nestjs/common';
import { AirTriggerDto, ActionType } from './dto/air-trigger.dto';
import { ControlService } from './control.service';

@Controller('control')
export class ControlController {
    constructor(private readonly controlService: ControlService) {}

    @Post()
    public airTrigger(@Body() body: AirTriggerDto) {
        return this.controlService.trigger(body.ipAddress, body.airStatus);
    }

}
