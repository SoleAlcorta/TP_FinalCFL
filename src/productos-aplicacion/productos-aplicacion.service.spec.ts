import { Test, TestingModule } from '@nestjs/testing';
import { ProductosAplicacionService } from './productos-aplicacion.service';

describe('ProductosAplicacionService', () => {
  let service: ProductosAplicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosAplicacionService],
    }).compile();

    service = module.get<ProductosAplicacionService>(ProductosAplicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
