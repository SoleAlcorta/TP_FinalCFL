import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LoteController } from './lote.controller';
import { Lote } from './lote.entity';
import { LoteService } from './lote.service';
import { Campo } from 'src/campo/campo.entity';
import { Aplicacion } from 'src/aplicacion/aplicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote, Campo, Aplicacion])
  ],
  controllers: [LoteController],
  providers: [LoteService]
})
export class LoteModule {}
