import { Test, TestingModule } from '@nestjs/testing';
import { ProductosAplicacionController } from './productos-aplicacion.controller';

describe('ProductosAplicacionController', () => {
  let controller: ProductosAplicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosAplicacionController],
    }).compile();

    controller = module.get<ProductosAplicacionController>(ProductosAplicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
