import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteController } from 'src/lote/lote.controller';
import { Lote } from 'src/lote/lote.entity';
import { LoteService } from 'src/lote/lote.service';
import { Producto } from 'src/producto/producto.entity';
import { ProductosAplicacionController } from 'src/productos-aplicacion/productos-aplicacion.controller';
import { ProductosAplicacionService } from 'src/productos-aplicacion/productos-aplicacion.service';
import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { AplicacionController } from './aplicacion.controller';
import { Aplicacion } from './aplicacion.entity';
import { AplicacionService } from './aplicacion.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Aplicacion, Productos_Aplicacion, Lote, Producto])
  ],
  controllers: [AplicacionController, ProductosAplicacionController, LoteController],
  providers: [AplicacionService, ProductosAplicacionService, LoteService]
})
export class AplicacionModule {}
