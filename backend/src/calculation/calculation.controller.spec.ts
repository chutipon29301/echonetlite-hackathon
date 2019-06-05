import { Test, TestingModule } from '@nestjs/testing';
import { CalculationController } from './calculation.controller';

describe('Calculation Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CalculationController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CalculationController = module.get<CalculationController>(
      CalculationController,
    );
    expect(controller).toBeDefined();
  });
});
