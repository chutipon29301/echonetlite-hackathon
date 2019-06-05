import { Inject, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { EchonetConnectionToken } from '../constants';
import { Echonet, EchonetDevice } from '../types';

@Injectable()
export class DiscoveryService {
  private echonetDeviceSubject: BehaviorSubject<
    EchonetDevice[]
  > = new BehaviorSubject([]);

  constructor(
    @Inject(EchonetConnectionToken) private readonly echonet: Echonet,
  ) // private readonly monitorService: MonitorService,
  {
    this.echonet.startDiscovery((err, res) => {
      if (err) {
        throw new Error(err.message);
      }
      const device = res.device;
      const eoj = device.eoj[0];
      const groupCode = eoj[0];
      const classCode = eoj[1];
      if (groupCode === 0x01 && classCode === 0x30) {
        const currentIpList = this.echonetDeviceSubject.value;
        currentIpList.push(device);
        this.echonetDeviceSubject.next(currentIpList);
      }
    });
  }

  public getCurrentAddress(): string[] {
    return this.echonetDeviceSubject.value.map(o => o.address);
  }

  public getCurrentDevice(): EchonetDevice[] {
    return this.echonetDeviceSubject.value;
  }

  public getSubscribableDevice(): BehaviorSubject<EchonetDevice[]> {
    return this.echonetDeviceSubject;
  }

  public findEchonetDeviceFromIpAddress(ipAddress: string): EchonetDevice {
    const currentDevice = this.getCurrentDevice();
    const index = currentDevice.findIndex(o => o.address === ipAddress);
    return currentDevice[index];
  }
}
