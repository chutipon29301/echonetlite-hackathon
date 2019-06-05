import { Test, TestingModule } from '@nestjs/testing';
import { ControlController } from './control.controller';

describe('Control Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ControlController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ControlController = module.get<ControlController>(ControlController);
    expect(controller).toBeDefined();
  });
});
