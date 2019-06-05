import { Injectable, Inject } from '@nestjs/common';
import { EchonetConnectionToken, EchonetClass } from '../constants';
import { Echonet, EchonetResponse } from '../types';
import { DiscoveryService } from '../discovery/discovery.service';
import { IotKitService } from '../iot-kit/iot-kit.service';
import { concat } from 'rxjs';

export interface EchonetDeviceInfo {
    address: string;
    tempOutside: number;
    tempInside: number;
    status: boolean;
}

export interface EchonetDeviceDetail {
    tempInside: number;
    tempOutside: number;
    status: boolean;
    light: number;
    humidity: number;
}

@Injectable()
export class MonitorService {

    constructor(
        @Inject(EchonetConnectionToken) private readonly echonet: Echonet,
        private readonly discoveryService: DiscoveryService,
        private readonly iotKitService: IotKitService,
    ) { }

    public async getEchonetClassFromDeviceWithIpAddress(ipAddress: string, echonetClass: EchonetClass): Promise<EchonetResponse> {
        const device = this.discoveryService.findEchonetDeviceFromIpAddress(ipAddress);
        return new Promise((resolve, reject) => {
            this.echonet.getPropertyValue(device.address, device.eoj[0], echonetClass, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    public async listEchonetDeviceInfo(): Promise<EchonetDeviceInfo[]> {
        const currentDevices = this.discoveryService.getCurrentDevice();
        const currentRoomTemperature = await Promise.all(currentDevices.map(
            (device) => this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.ROOM_TEMPERATURE)));
        const currentOutsideTemperature = await Promise.all(currentDevices.map(
            (device) => this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.OUTDOOR_TEMPERATURE)));
        const currentStatus = await Promise.all(currentDevices.map(
            (device) => this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.OPERATION_STAT)));
        const results: EchonetDeviceInfo[] = [];
        for (let i = 0; i < currentDevices.length; i++) {
            results.push({
                address: currentDevices[i].address,
                status: currentStatus[i].message.data.status,
                tempOutside: currentOutsideTemperature[i].message.data.temperature,
                tempInside: currentRoomTemperature[i].message.data.temperature,
            });
        }
        return results;
    }

    public async getEchonetDeviceDetail(ipAddress: string): Promise<EchonetDeviceDetail> {
        const device = this.discoveryService.findEchonetDeviceFromIpAddress(ipAddress);
        const currentRoomTemperature = await this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.ROOM_TEMPERATURE);
        const currentOutsideTemperature = await this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.OUTDOOR_TEMPERATURE);
        const currentStatus = await this.getEchonetClassFromDeviceWithIpAddress(device.address, EchonetClass.OPERATION_STAT);
        const light = this.iotKitService.getIotLight();
        const humidity = this.iotKitService.getIotHumidity();
        return {
            humidity,
            light,
            status: currentStatus.message.data.status,
            tempInside: currentRoomTemperature.message.data.temperature,
            tempOutside: currentOutsideTemperature.message.data.temperature,
        };

    }
}

