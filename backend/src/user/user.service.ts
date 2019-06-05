import { Injectable } from '@nestjs/common';
import { CalculationService } from '../calculation/calculation.service';

@Injectable()
export class UserService {

    constructor(private readonly calculationService: CalculationService) { }

    public setBedtime(date: Date, temp: number) {
        this.calculationService.createOpenJob(date, temp);
    }

    public setBedtimeFor(date: Date, temp: number, ipAddress: string) {
        this.calculationService.createOpenJobFor(date, temp, ipAddress);
    }
}

