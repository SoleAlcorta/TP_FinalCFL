import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosAplicacionController } from './productos-aplicacion.controller';
import { ProductosAplicacionService } from './productos-aplicacion.service';
import { Productos_Aplicacion } from './productos_aplicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos_Aplicacion])
  ],
  controllers: [ProductosAplicacionController],
  providers: [ProductosAplicacionService]
})
export class ProductosAplicacionModule {}
