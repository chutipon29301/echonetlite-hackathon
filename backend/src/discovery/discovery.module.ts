import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';
import { EchonetModule } from '../echonet/echonet.module';
import { MonitorModule } from '../monitor/monitor.module';

@Module({
  imports: [EchonetModule],
  providers: [DiscoveryService],
  controllers: [DiscoveryController],
  exports: [DiscoveryService],
})
export class DiscoveryModule {}
