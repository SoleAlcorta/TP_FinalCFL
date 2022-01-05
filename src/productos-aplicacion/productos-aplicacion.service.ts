import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos_AplicacionDTO } from './productos_aplicacion.dto';
import { Productos_Aplicacion } from './productos_aplicacion.entity';
import { Productos_AplicacionDTO_conId } from './productos_aplicacion_conId.dto';

@Injectable()
export class ProductosAplicacionService {
    constructor (@InjectRepository(Productos_Aplicacion) private readonly productos_aplicacionRepository : Repository<Productos_Aplicacion>) {}

    //Consultar
    public async getProdAplicaciones(): Promise<Productos_Aplicacion[]>{
        try {
            const prod_aplicaciones: Productos_Aplicacion[] = await this.productos_aplicacionRepository.find()
            console.log(prod_aplicaciones)
            return prod_aplicaciones;           
        } catch (error) { 
            throw new HttpException( { error : `Error al buscar productos_aplicaciones: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getProdAplicacion(id: number): Promise<Productos_Aplicacion>{
    try {
            const prod_aplicacion: Productos_Aplicacion = await this.productos_aplicacionRepository.findOne(id)
            console.log(prod_aplicacion)
            return prod_aplicacion;           
        } catch (error) {
            throw new HttpException( { error : `Error al buscar productos_aplicacion: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Agregar  OJO. ¿EXISTE ALGUNA MANERA DE AGREGAR MÁS PRODUCTOS Y MÁS DOSIS EN LA APLICACIÓN?
    public async addProdAplicacion(newProdAplicacion: Productos_AplicacionDTO): Promise<Productos_Aplicacion[]> {
        try {
            let nroAplicacion: number = await this.generarId();
            let prod_aplicacionCreada = new Productos_Aplicacion(nroAplicacion, newProdAplicacion.idAplicacion, newProdAplicacion.idProducto, newProdAplicacion.dosis)
            await this.productos_aplicacionRepository.save(prod_aplicacionCreada);
            const prod_aplicaciones: Productos_Aplicacion[] = await this.productos_aplicacionRepository.find()
            return prod_aplicaciones; 

            } catch (error) { 
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    // Actualizar
    public async updProdAplicacion(prod_aplicacion: Productos_AplicacionDTO_conId): Promise<Productos_Aplicacion[]> { 
        try { 
            const prod_aplicacionCambia: Productos_Aplicacion = await this.productos_aplicacionRepository.findOne(prod_aplicacion.nroAplicacion);
            if (!prod_aplicacionCambia) { 
                throw new HttpException( { error : `Error al buscar productos_aplicacion con Id: ${prod_aplicacion.nroAplicacion}`}, HttpStatus.NOT_FOUND);
            } 
            prod_aplicacionCambia.settIdAplicacion(prod_aplicacion.idAplicacion);
            prod_aplicacionCambia.setIdProducto (prod_aplicacion.idProducto);
            prod_aplicacionCambia.setDosis (prod_aplicacion.dosis);
            await this.productos_aplicacionRepository.save(prod_aplicacionCambia); 
            const prod_aplicaciones: Productos_Aplicacion[] = await this.productos_aplicacionRepository.find() 
            return prod_aplicaciones; 

        } catch (error) { 
            throw new HttpException({ error : `Error modificando productos_aplicacion nro: ${prod_aplicacion.nroAplicacion}`}, HttpStatus.NOT_FOUND)
        }
    }
    // Eliminar
    public async delProdAplicacion(id: number) : Promise<Productos_Aplicacion[]> { 
        try {
            const prod_aplicacion: Productos_Aplicacion = await this.productos_aplicacionRepository.findOne(id);
            if (!prod_aplicacion) { 
                throw new HttpException( { error : `Error buscando productos_aplicacion nro: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            await this.productos_aplicacionRepository.delete(id);
            const prod_aplicaciones: Productos_Aplicacion[] = await this.productos_aplicacionRepository.find() 
            return prod_aplicaciones;
        } catch (error) { 
            throw new HttpException( { error : `Error eliminando productos_aplicacion nro: ${id}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Métodos privados
    public async generarId() {
        try {
            const {max} = await this.productos_aplicacionRepository
            .createQueryBuilder("productos_aplicacion") 
            .select("MAX(aplicaciones.idAplicacion)+1", "max") 
            .getRawOne();
            let nuevoNroAplicacion: number = max ?? 1; 
            return nuevoNroAplicacion;
        } catch (error) {
            throw new HttpException( { error : `Error obteniendo nuevo nro de aplicacion: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
}
