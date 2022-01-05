import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampoModule } from './campo/campo.module';
import { AplicacionModule } from './aplicacion/aplicacion.module';
import { ProductosAplicacionModule } from './productos-aplicacion/productos-aplicacion.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    CampoModule,
    TypeOrmModule.forRoot(),
    AplicacionModule,
    ProductosAplicacionModule,
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
