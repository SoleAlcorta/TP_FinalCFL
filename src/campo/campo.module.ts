import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampoController } from './campo.controller';
import { Campo } from './campo.entity';
import { CampoService } from './campo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campo])
  ],
  controllers: [CampoController],
  providers: [CampoService]
})
export class CampoModule {}
