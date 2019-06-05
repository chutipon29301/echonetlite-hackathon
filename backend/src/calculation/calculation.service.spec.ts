import { Test, TestingModule } from '@nestjs/testing';
import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationService],
    }).compile();
    service = module.get<CalculationService>(CalculationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
