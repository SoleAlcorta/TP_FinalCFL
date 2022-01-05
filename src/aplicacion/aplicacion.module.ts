import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacionController } from './aplicacion.controller';
import { Aplicacion } from './aplicacion.entity';
import { AplicacionService } from './aplicacion.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Aplicacion])
  ],
  controllers: [AplicacionController],
  providers: [AplicacionService]
})
export class AplicacionModule {}
