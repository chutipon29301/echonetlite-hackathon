import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Get()
  public getScheduleJob() {
    return { jobs: this.calculationService.listScheduledJob() };
  }

  @Get('/sunrise')
  public getSunriseJob() {
    return this.calculationService.calculateTimeSunrise();
  }

  @Get('/setCloseSunrise')
  public async setSunriseJob() {
    return await this.calculationService.addAutoSunriseScheduler();
  }

  @Delete('/:name')
  public delete(@Param('name') name: string) {
    this.delete(name);
  }
}
