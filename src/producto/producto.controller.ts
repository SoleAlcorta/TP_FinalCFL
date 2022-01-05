import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';


@Controller('producto')
export class ProductoController {
    constructor (private readonly productoService : ProductoService) {}

    @Get()
    public async getProductos(): Promise<Producto[]> {
        return await this.productoService.getProductos();
    }

    @Get(':id')
    public async getProducto(@Param('id') id: string): Promise<Producto> {
        return await this.productoService.getProducto(parseInt(id));
    }
    @Post('new-producto')
    createProducto (@Body() ProductoDTO: ProductoDTO): Promise <Producto[]>{
        return this.productoService.addProducto(ProductoDTO);
    }
    
    @Put(':id')
    public async updProducto (@Body() ProductoDTO: ProductoDTO): Promise <Producto[]>{
        return await this.productoService.updProducto(ProductoDTO);
    }
    @Delete(':id')  
    public delProducto(@Param('id') id: string): Promise<Producto[]> {
        return this.productoService.delProducto(parseInt(id));
    }
}   
