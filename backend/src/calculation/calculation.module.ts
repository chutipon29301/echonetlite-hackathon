import { Module, HttpModule } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CalculationController } from './calculation.controller';

@Module({
    imports: [
    providers: [CalculationService],
    exports: [CalculationService],
    controllers: [CalculationController],
})
export class CalculationModule { }
