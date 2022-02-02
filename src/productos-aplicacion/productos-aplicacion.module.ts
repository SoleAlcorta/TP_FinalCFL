import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacionController } from 'src/aplicacion/aplicacion.controller';
import { Aplicacion } from 'src/aplicacion/aplicacion.entity';
import { AplicacionService } from 'src/aplicacion/aplicacion.service';
import { LoteController } from 'src/lote/lote.controller';
import { Lote } from 'src/lote/lote.entity';
import { LoteService } from 'src/lote/lote.service';
import { ProductoController } from 'src/producto/producto.controller';
import { Producto } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import { ProductosAplicacionController } from './productos-aplicacion.controller';
import { ProductosAplicacionService } from './productos-aplicacion.service';
import { Productos_Aplicacion } from './productos_aplicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos_Aplicacion, Producto, Aplicacion])
  ],
  controllers: [ProductosAplicacionController],
  providers: [ProductosAplicacionService],
})
export class ProductosAplicacionModule {}
