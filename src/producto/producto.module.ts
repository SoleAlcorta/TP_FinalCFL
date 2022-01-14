import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosAplicacionController } from 'src/productos-aplicacion/productos-aplicacion.controller';
import { ProductosAplicacionService } from 'src/productos-aplicacion/productos-aplicacion.service';
import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Productos_Aplicacion])
  ],
  controllers: [ProductoController, ProductosAplicacionController],
  providers: [ProductoService, ProductosAplicacionService]
})
export class ProductoModule {}
