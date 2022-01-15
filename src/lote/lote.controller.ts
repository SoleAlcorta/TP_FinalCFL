import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LoteDTO } from './lote.dto';
import { Lote } from './lote.entity';
import { LoteService } from './lote.service';
import { Lote_conIdDTO } from './lote_conId.dto';

@Controller('lote')
export class LoteController {
    constructor(private readonly loteService : LoteService) {}

    @Get()
    public async getLotes(): Promise<Lote[]> {
        return await this.loteService.getLotes();
    }
    @Get(':id')
    public async getLote(@Param('id') id: string): Promise<Lote> {
        return await this.loteService.getLote(parseInt(id));
    }
    @Post("new-lote")
    createLote(@Body() LoteDto: LoteDTO): Promise<Lote[]> {
    return this.loteService.addLote(LoteDto);
    }
    @Put(':id')
    public async updLote(@Body() lote_conIdDTO: Lote_conIdDTO): Promise<Lote[]> { 
        return await this.loteService.updLote(lote_conIdDTO);  
    }
    @Delete(':id')  
    public delLote(@Param('id') id: string): Promise<Lote[]> {
        return this.loteService.delLote(parseInt(id));
    }
}