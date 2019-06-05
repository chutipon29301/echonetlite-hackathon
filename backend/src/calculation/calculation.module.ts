import { Module, HttpModule } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { DiscoveryModule } from '../discovery/discovery.module';
import { ControlModule } from '../control/control.module';
import { IotKitModule } from '../iot-kit/iot-kit.module';
import { CalculationController } from './calculation.controller';

@Module({
  imports: [
    DiscoveryModule,
    ControlModule,
    DiscoveryModule,
    IotKitModule,
    HttpModule,
  ],
  providers: [CalculationService],
  exports: [CalculationService],
  controllers: [CalculationController],
})
export class CalculationModule {}
