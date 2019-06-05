import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveryController } from './discovery.controller';

describe('Discovery Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DiscoveryController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DiscoveryController = module.get<DiscoveryController>(DiscoveryController);
    expect(controller).toBeDefined();
  });
});
