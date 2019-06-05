import { Test, TestingModule } from '@nestjs/testing';
import { MonitorController } from './monitor.controller';

describe('Monitor Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MonitorController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MonitorController = module.get<MonitorController>(
      MonitorController,
    );
    expect(controller).toBeDefined();
  });
});
