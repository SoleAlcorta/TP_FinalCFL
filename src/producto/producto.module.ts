import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
