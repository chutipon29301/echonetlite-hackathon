import { Controller, Get } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { EchonetDevice } from '../types';

@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get()
  public list(): { devices: EchonetDevice[] } {
    return { devices: this.discoveryService.getCurrentDevice() };
  }

  @Get('info')
  public listIpAddress(): { addresses: string[] } {
    return { addresses: this.discoveryService.getCurrentAddress() };
  }
}
