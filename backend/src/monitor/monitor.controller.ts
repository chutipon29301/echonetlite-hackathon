import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  MonitorService,
  EchonetDeviceInfo,
  EchonetDeviceDetail,
} from './monitor.service';
import { EchonetClass } from '../constants';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  public async detail(
    @Query('ipAddress') ipAddress: string,
    @Query('echonetClass') echonetClass: string,
  ) {
    return await this.monitorService.getEchonetClassFromDeviceWithIpAddress(
      ipAddress,
      EchonetClass[echonetClass],
    );
  }

  @Get('allDevice')
  public async allDeviceSummary(): Promise<{ devices: EchonetDeviceInfo[] }> {
    const devices = await this.monitorService.listEchonetDeviceInfo();
    return { devices };
  }

  @Get('detail/:ipAddress')
  public async deviceDetailByIp(
    @Param('ipAddress') ipAddress: string,
  ): Promise<{ detail: EchonetDeviceDetail }> {
    const detail = await this.monitorService.getEchonetDeviceDetail(ipAddress);
    return { detail };
  }
}
