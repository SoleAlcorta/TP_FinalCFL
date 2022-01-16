import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from 'src/lote/lote.entity';
import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { AplicacionController } from './aplicacion.controller';
import { Aplicacion } from './aplicacion.entity';
import { AplicacionService } from './aplicacion.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Aplicacion, Productos_Aplicacion, Lote])
  ],
  controllers: [AplicacionController],
  providers: [AplicacionService]
})
export class AplicacionModule {}
