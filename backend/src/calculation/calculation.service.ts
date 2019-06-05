import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { Job, scheduleJob } from 'node-schedule';
import { ControlService } from '../control/control.service';
import { ActionType } from '../control/dto/air-trigger.dto';
import { DiscoveryService } from '../discovery/discovery.service';
import { IotKitService } from '../iot-kit/iot-kit.service';
import { WeatherRequestResponse } from './dto/weather-response-request.dto';
import { CITY_ID, YOUR_API_KEY } from '../constants';

@Injectable()
export class CalculationService {

    private willExecuteJob: Job[] = [];

    constructor(
        private readonly controlService: ControlService,
        private readonly discoveryService: DiscoveryService,
        private readonly iotKitService: IotKitService,
        private readonly httpService: HttpService,
    ) { }

    public async calculateTimeSunrise(): Promise<Date> {
        try {
            const result = await this.httpService
                .request<WeatherRequestResponse>({
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    url: `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${YOUR_API_KEY}`,
                })
                .toPromise();
            const unix = result.data.sys.sunrise;
            return new Date(unix * 1000);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    public async createOpenJobFor(targetDate: Date, targetTemperature: number, ipAddress: string) {
        const date = this.calculateTimeOpen(targetDate, targetTemperature);
        await this.createActionInTimeFor(date, ActionType.OPEN, ipAddress);
    }

    public async createOpenJob(targetDate: Date, targetTemperature: number) {
        const date = this.calculateTimeOpen(targetDate, targetTemperature);
        await this.createActionOnTime(date, ActionType.OPEN);
    }

    public calculateTimeOpen(setDate: Date, temperature: number) {
        // this.controlService.trigger()
        const diff = Math.abs(this.iotKitService.getIotTemperature() - temperature);
        let buildTime: number;
        if (diff > 5) {
            buildTime = 5;
        } else {
            buildTime = 2;
        }
        // return new Date(setDate.getTime() + buildTime * 60000);
        return new Date(setDate.getTime() + 60000);
    }

    public listScheduledJob(): Job[] {
        return this.willExecuteJob;
    }

    public deleteScheduledJobWithName(name: string) {
        const index = this.willExecuteJob.findIndex((o) => o.name === name);
        const job = this.willExecuteJob[index];
        job.cancel();
    }

    public async addAutoSunriseScheduler(): Promise<Date> {
        const sunriseTime = await this.calculateTimeSunrise();
        this.createActionOnTime(sunriseTime, ActionType.CLOSE);
        return sunriseTime;
    }

    private async createActionOnTime(date: Date, action: ActionType) {
        this.willExecuteJob.push(
            scheduleJob(`${action}-${date.toISOString()}`, date, () => {
                this.controlService.changeOperationStatusOfAllDevices(action);
                this.willExecuteJob = this.willExecuteJob.filter((o) => o === null);
            }),
        );
    }

    private async createActionInTimeFor(date: Date, action: ActionType, ipAddress: string) {
        this.willExecuteJob.push(
            scheduleJob(`${action}-${date.toISOString()}`, date, () => {
                this.controlService.changeOperationStatusWithIpAddress(ipAddress, action);
                this.willExecuteJob = this.willExecuteJob.filter((o) => o === null);
            }),
        );
    }

}
