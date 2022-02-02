import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AplicacionDTO } from './aplicacion.dto';
import { Aplicacion } from './aplicacion.entity';
import { AplicacionService } from './aplicacion.service';
// import { AplicacionDTO_conId } from './aplicacion_conId.dto';

@Controller('aplicacion') 
export class AplicacionController {
    constructor(private readonly aplicacionService : AplicacionService) {}

    @Get()
    public async getAplicaciones(): Promise<Aplicacion[]> {
        return await this.aplicacionService.getAplicaciones();
    }
    @Get(':id')
    public async getAplicacion(@Param('id') id: string): Promise<Aplicacion> {
        return await this.aplicacionService.getAplicacion(parseInt(id));
    }
    @Post('new-aplicacion')
    createAplicacion(@Body() aplicacionDto: AplicacionDTO): Promise<Aplicacion[]> {
    return this.aplicacionService.addAplicacion(aplicacionDto);
    }
    @Put(':id')
    public async updAplicacion(@Param('id') id:number,@Body() aplicacionDTO: AplicacionDTO): Promise<string> {
     return this.aplicacionService.updAplicacion(id,aplicacionDTO);
    }
    @Delete(':id')  
    public delAplicacion(@Param('id') id: string): Promise<Aplicacion[]> {
        return this.aplicacionService.delAplicacion(parseInt(id));
    }
}
