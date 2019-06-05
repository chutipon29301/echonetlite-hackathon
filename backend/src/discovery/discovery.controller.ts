import { Controller, Get } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { EchonetDevice } from '../types';

@Controller('discovery')
export class DiscoveryController {

    constructor(private readonly discoveryService: DiscoveryService) { }
}
