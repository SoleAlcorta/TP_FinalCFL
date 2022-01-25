import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductosAplicacionService } from './productos-aplicacion.service';
import { Productos_AplicacionDTO } from './productos_aplicacion.dto';
import { Productos_Aplicacion } from './productos_aplicacion.entity';
import { Productos_AplicacionDTO_conId } from './productos_aplicacion_conId.dto';

@Controller('productos-aplicacion')
export class ProductosAplicacionController {
    constructor(private readonly productos_aplicacionService : ProductosAplicacionService) {}

    @Get()
    public async getProdAplicaciones(): Promise<Productos_Aplicacion[]> {
        return await this.productos_aplicacionService.getProdAplicaciones();
    }
    @Get(':id')
    public async getProdAplicacion(@Param('id') id: string): Promise<Productos_Aplicacion> {
        return await this.productos_aplicacionService.getProdAplicacion(parseInt(id));
    }
    @Post("new-prod-aplicacion")
    addProdAplicacion(@Body() prodAplicacionDto: Productos_AplicacionDTO): Promise<Productos_Aplicacion> {
        return this.productos_aplicacionService.addProdAplicacion(prodAplicacionDto);
    }
    @Put(':id')
    public async updProdAplicacion(@Body() prodAplicacion_conIdDTO: Productos_AplicacionDTO_conId): Promise<Productos_Aplicacion[]> { 
        return await this.productos_aplicacionService.updProdAplicacion(prodAplicacion_conIdDTO);  
    }
    @Delete(':id')  
    public delProdAplicacion(@Param('id') id: string): Promise<Productos_Aplicacion[]> {
        return this.productos_aplicacionService.delProdAplicacion(parseInt(id));
    }
}
