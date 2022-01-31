import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Lote } from 'src/lote/lote.entity';
import { CampoController } from './campo.controller';
import { Campo } from './campo.entity';
import { CampoService } from './campo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campo, Cliente, Lote])
  ],
  controllers: [CampoController],
  providers: [CampoService]
})
export class CampoModule {} 