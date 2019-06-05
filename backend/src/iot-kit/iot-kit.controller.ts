import { Controller, Post, Body } from '@nestjs/common';
import { IotKitService } from './iot-kit.service';
@Controller('iot-kit')
export class IotKitController {

    constructor(private readonly iotKitService: IotKitService) { }

}

