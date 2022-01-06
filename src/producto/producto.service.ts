import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoDTO_conId } from './producto_conId.dto';

@Injectable()
export class ProductoService {
    constructor (@InjectRepository(Producto) private readonly productoRepository : Repository<Producto>) {}

    public async getProductos(): Promise<Producto[]>{
        try {
            const producto: Producto[] = await this.productoRepository.find()
            console.log(producto)
            return producto;           
        } catch (error) { 
            throw new HttpException( { error : `Error al buscar los productos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getProducto(id: number): Promise<Producto>{
     try {
            const producto: Producto = await this.productoRepository.findOne(id)
            console.log(producto)
            return producto;           
        } catch (error) {
            throw new HttpException( { error : `Error al buscar el producto: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    
    public async addProducto(newProducto: ProductoDTO): Promise<Producto[]> {
        try {
            let idProducto: number = await this.generarId();
            let productoNuevo = new Producto (idProducto, newProducto.nombre);
            await this.productoRepository.save(productoNuevo);
            const producto: Producto[] = await this.productoRepository.find()
            return producto;

            } catch (error) { 
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updProducto(producto: ProductoDTO_conId): Promise<Producto[]> { 
        try { 
            const updProd: Producto = await this.productoRepository.findOne(producto.idProducto);
            if (!updProd) { 
                throw new HttpException( { error : `Error buscando el producto de Id: ${producto.idProducto}`}, HttpStatus.NOT_FOUND);
            } 
            await this.productoRepository.save(updProd); 
            const productos: Producto[] = await this.productoRepository.find() 
            return productos; 

        } catch (error) { 
            throw new HttpException({ error : `Error modificando el producto de Id: ${producto.idProducto}`}, HttpStatus.NOT_FOUND)
        }
    }

    public async delProducto(id: number) : Promise<Producto[]> { 
        try {
            const producto: Producto = await this.productoRepository.findOne(id);
            if (!producto) { 
                throw new HttpException( { error : `Error buscando el producto de Id: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            await this.productoRepository.delete(id);
            const productos: Producto[] = await this.productoRepository.find() 
            return productos;
        } catch (error) { 
            throw new HttpException( { error : `Error eliminando el producto de Id: ${id}`}, HttpStatus.NOT_FOUND);
        }
    }

    private async generarId() {
        try {
            const {max} = await this.productoRepository
            .createQueryBuilder('productos') 
            .select("MAX(productos.idProducto)+1", "max") 
            .getRawOne();
            let nuevoIdProducto: number = max ?? 1; 
            return nuevoIdProducto;
        } catch (error) {
            throw new HttpException( { error : `Error obteniendo nuevo id del producto: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

}

