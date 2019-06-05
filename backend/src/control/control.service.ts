import { Injectable, Inject } from '@nestjs/common';
import { EchonetConnectionToken, EchonetClass } from '../constants';
import { Echonet, EchonetDevice } from '../types';
import { DiscoveryService } from '../discovery/discovery.service';
import { ActionType } from './dto/air-trigger.dto';

@Injectable()
export class ControlService {

    constructor(
        @Inject(EchonetConnectionToken) private readonly echonet: Echonet,
        private readonly discoveryService: DiscoveryService,
    ) { }

    public trigger(ipAddress: string, status: ActionType) {
        const device = this.discoveryService.findEchonetDeviceFromIpAddress(ipAddress);
        const epc = 0x80;
        const edt = { status: status === ActionType.OPEN };
        this.echonet.setPropertyValue(ipAddress, device.eoj[0], epc, edt);
    }

    public changeOperationStatusWithIpAddress(
        ipAddress: string,
        status: ActionType,
    ) {
        const device = this.discoveryService.findEchonetDeviceFromIpAddress(ipAddress);
        this.setOperationStatusOfDevices([device], status);
    }

    public changeOperationStatusOfAllDevices(
        status: ActionType,
    ) {
        const devices = this.discoveryService.getCurrentDevice();
        this.setOperationStatusOfDevices(devices, status);
    }

    public changeTemperatureWithIpAddress(
        ipAddress: string,
        temperature: number) {
        const device = this.discoveryService.findEchonetDeviceFromIpAddress(ipAddress);
        this.setRoomTemperatureOfDevices([device], temperature);
    }

    public changeTemperatureOfAllDevices(
        temperature: number,
    ) {
        const devices = this.discoveryService.getCurrentDevice();
        this.setRoomTemperatureOfDevices(devices, temperature);
    }

    private setOperationStatusOfDevices(
        devices: EchonetDevice[],
        status: ActionType,
    ) {
        devices.forEach((device) => {
            this.echonet.setPropertyValue(device.address, device.eoj[0], EchonetClass.OPERATION_STAT, { status: status === ActionType.OPEN });
        });
    }

    private setRoomTemperatureOfDevices(
        devices: EchonetDevice[],
        temperature: number,
    ) {
        devices.forEach((device) => {
            this.echonet.setPropertyValue(device.address, device.eoj[0], EchonetClass.ROOM_TEMPERATURE, { temperature });
        });
    }

}
