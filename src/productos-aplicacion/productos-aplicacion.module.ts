import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from 'src/producto/producto.controller';
import { Producto } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';
import { ProductosAplicacionController } from './productos-aplicacion.controller';
import { ProductosAplicacionService } from './productos-aplicacion.service';
import { Productos_Aplicacion } from './productos_aplicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos_Aplicacion, Producto])
  ],
  controllers: [ProductosAplicacionController, ProductoController],
  providers: [ProductosAplicacionService, ProductoService]
})
export class ProductosAplicacionModule {}
