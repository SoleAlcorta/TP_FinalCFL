import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { application } from 'express';
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
    @Get() //Devuelve el resultado de la consulta seleccionada
    create(@Body() consultas: any): Promise<Aplicacion[]> {
        return this.aplicacionService.addAplicacion(consultas);
    }
    
    @Put(':index')
    public async updAplicacion(@Body() aplicacionBody:any): Promise<boolean> {
     return this.aplicacionService.updAplicacion(aplicacionBody);
    }

    @Delete(':id')  
    public delAplicacion(@Param('id') id): Promise<boolean> {
        return this.aplicacionService.delAplicacion(parseInt(id));
    }
}
