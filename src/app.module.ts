import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { CampoModule } from './campo/campo.module';
import { AplicacionModule } from './aplicacion/aplicacion.module';
import { ProductosAplicacionModule } from './productos-aplicacion/productos-aplicacion.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ClienteModule,
    CampoModule,
    AplicacionModule,
    ProductosAplicacionModule,
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}