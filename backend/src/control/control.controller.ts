import { Controller, Post, Body } from '@nestjs/common';
import { ControlService } from './control.service';

@Controller('control')
export class ControlController {
    constructor(private readonly controlService: ControlService) {}

}
