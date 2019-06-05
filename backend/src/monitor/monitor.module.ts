import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { EchonetModule } from '../echonet/echonet.module';
import { DiscoveryModule } from '../discovery/discovery.module';
import { IotKitModule } from '../iot-kit/iot-kit.module';

@Module({
  imports: [EchonetModule, DiscoveryModule, IotKitModule],
  providers: [MonitorService],
  controllers: [MonitorController],
  exports: [MonitorService],
})
export class MonitorModule {}
