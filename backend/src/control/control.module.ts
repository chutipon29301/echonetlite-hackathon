import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { DiscoveryModule } from '../discovery/discovery.module';

@Module({
  imports: [DiscoveryModule],
  providers: [ControlService],
  controllers: [ControlController],
  exports: [ControlService],
})
export class ControlModule {}
