import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente.controller';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';

@Module({
  imports:[ TypeOrmModule.forFeature([
    Cliente]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
