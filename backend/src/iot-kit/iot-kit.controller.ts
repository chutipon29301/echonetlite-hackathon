import { Controller, Post, Body } from '@nestjs/common';
import { IotKitService } from './iot-kit.service';
import { IotDataDto } from './dto/iot-data.dto';

@Controller('iot-kit')
export class IotKitController {
  constructor(private readonly iotKitService: IotKitService) {}

  @Post()
  public getIoTData(@Body() body: IotDataDto) {
    this.iotKitService.iotDataReceiver(
      body.humidity,
      body.temperature,
      body.light,
    );
  }
}
