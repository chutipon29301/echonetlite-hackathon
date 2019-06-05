import { Test, TestingModule } from '@nestjs/testing';
import { IotKitController } from './iot-kit.controller';

describe('IotKit Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [IotKitController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: IotKitController = module.get<IotKitController>(
      IotKitController,
    );
    expect(controller).toBeDefined();
  });
});
