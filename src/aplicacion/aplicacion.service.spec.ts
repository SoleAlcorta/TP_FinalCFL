import { Test, TestingModule } from '@nestjs/testing';
import { AplicacionService } from './aplicacion.service';

describe('AplicacionService', () => {
  let service: AplicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicacionService],
    }).compile();

    service = module.get<AplicacionService>(AplicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
