import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampoModule } from './campo/campo.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    CampoModule,
    TypeOrmModule.forRoot(),
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
