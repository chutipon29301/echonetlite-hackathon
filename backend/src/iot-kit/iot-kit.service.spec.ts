import { Test, TestingModule } from '@nestjs/testing';
import { IotKitService } from './iot-kit.service';

describe('IotKitService', () => {
  let service: IotKitService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IotKitService],
    }).compile();
    service = module.get<IotKitService>(IotKitService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
