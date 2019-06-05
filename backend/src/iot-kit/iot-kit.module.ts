import { Module } from '@nestjs/common';
import { IotKitService } from './iot-kit.service';
import { IotKitController } from './iot-kit.controller';

@Module({
  providers: [IotKitService],
  controllers: [IotKitController],
  exports: [IotKitService],
})
export class IotKitModule {}
