import { Injectable } from '@nestjs/common';
import { IotDevice } from '../types';

@Injectable()
export class IotKitService {

    private iotDevice: IotDevice = { humidity: 0, temperature: 0, light: 0 };

    public iotDataReceiver(humidity: number, temperature: number, light: number) {
        this.iotDevice.humidity = humidity;
        this.iotDevice.temperature = temperature;
        this.iotDevice.light = light;
    }

    public getIotHumidity() {
        return this.iotDevice.humidity;
    }
    public getIotTemperature() {
        return this.iotDevice.temperature;
    }
    public getIotLight() {
        return this.iotDevice.light;
    }
}

