import { Test, TestingModule } from '@nestjs/testing';
import { AplicacionController } from './aplicacion.controller';

describe('AplicacionController', () => {
  let controller: AplicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AplicacionController],
    }).compile();

    controller = module.get<AplicacionController>(AplicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
