import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscoveryModule } from './discovery/discovery.module';
import { EchonetModule } from './echonet/echonet.module';
import { ControlModule } from './control/control.module';
import { MonitorModule } from './monitor/monitor.module';
import { IotKitModule } from './iot-kit/iot-kit.module';
import { CalculationModule } from './calculation/calculation.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [DiscoveryModule, EchonetModule, ControlModule, MonitorModule, IotKitModule, CalculationModule, UserModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
