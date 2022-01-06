import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LoteController } from './lote.controller';
import { Lote } from './lote.entity';
import { LoteService } from './lote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote])
  ],
  controllers: [LoteController],
  providers: [LoteService]
})
export class LoteModule {}
