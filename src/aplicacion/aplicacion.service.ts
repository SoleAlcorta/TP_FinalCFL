import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campo } from 'src/campo/campo.entity';
import { Lote } from 'src/lote/lote.entity';
import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { Repository } from 'typeorm';
import { AplicacionDTO } from './aplicacion.dto';
import { Aplicacion } from './aplicacion.entity';


@Injectable()
export class AplicacionService {
    campoRepository: any;

    constructor (
        @InjectRepository(Aplicacion) private readonly aplicacionRepository : Repository<Aplicacion>,
        @InjectRepository(Productos_Aplicacion) private readonly productos_aplicacionRepository : Repository<Productos_Aplicacion>,
        @InjectRepository(Lote) private readonly loteRepository : Repository<Lote>
        ) {}

    //Consultar
    public async getAplicaciones(): Promise<Aplicacion[]>{
        try {
            const aplicaciones: Aplicacion[] = await this.aplicacionRepository.find( {relations: ['loteAplicacion'/*, 'loteCampo'*/]} )
            console.log(aplicaciones)
            return aplicaciones;           
        } catch (error) { 
            throw new HttpException( { error : `Error al buscar aplicaciones: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getAplicacion(id: number): Promise<Aplicacion>{
    try {
            const aplicacion: Aplicacion = await this.aplicacionRepository.findOne(id, {relations: ['loteAplicacion'/*,'loteCampo'*/]} )
            console.log(aplicacion)
            return aplicacion;           
        } catch (error) {
            throw new HttpException( { error : `Error al buscar la aplicacion: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Agregar
    // public async addAplicacion(newAplicacion: AplicacionDTO): Promise<Aplicacion> {
    //     try {
    //         let idNroAplicacion: number = await this.generarId();
    //         const lote : Lote = await this.loteRepository.findOne(newAplicacion.loteAplicacion);
    //         if(!lote){
    //             throw new HttpException( { error : `Error buscando el lote: ${newAplicacion.loteAplicacion}`}, HttpStatus.NOT_FOUND);
    //         }
    //         const campo : Lote = await this.campoRepository.findOne(newAplicacion.campoAplicacion);
    //         if(!lote){
    //         throw new HttpException( { error : `Error buscando el lote: ${newAplicacion.campoAplicacion}`}, HttpStatus.NOT_FOUND);
    //         }
    //         const aplicacion: Aplicacion = await this.aplicacionRepository.save(new Aplicacion(
    //             idNroAplicacion,
    //             newAplicacion.fechaAplicacion,
    //             lote,
    //             campo
    //         ));
    //         return aplicacion;
    //         } catch (error) { 
    //         throw new HttpException({
    //         status: HttpStatus.NOT_FOUND,
    //         error: "Hay un error en la solicitud, " + error,
    //         }, HttpStatus.NOT_FOUND);
    //     }

        //----------------------------------------------------
        // try {
        //     let idAplicacion: number = await this.generarId();
        //     let aplicacionCreada = new Aplicacion(idAplicacion, newAplicacion.fechaAplicacion, newAplicacion.loteAplicacion, newAplicacion.campoAplicacion)
        //     await this.aplicacionRepository.save(aplicacionCreada);
        //     const aplicaciones: Aplicacion[] = await this.aplicacionRepository.find()
        //     return aplicaciones; 

        //     } catch (error) { 
        //     throw new HttpException({
        //     status: HttpStatus.NOT_FOUND,
        //     error: "Hay un error en la solicitud, " + error,
        //     }, HttpStatus.NOT_FOUND);
        // }
    //}

    //Agregar 2
    public async addAplicacion(newAplicacion: AplicacionDTO): Promise<Aplicacion[]> {
        try {
            let idAplicacion: number = await this.generarId();
            let aplicacionNueva = new Aplicacion(idAplicacion, newAplicacion.fechaAplicacion, newAplicacion.loteAplicacion/*, newAplicacion.loteCampo*/);
            await this.aplicacionRepository.save(aplicacionNueva);
            const aplicacion: Aplicacion[] = await this.aplicacionRepository.find()
            return aplicacion;

        } catch (error) { 
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }   
    }

    //Actualizar
    public async updAplicacion(id: number, aplicacionDTO: AplicacionDTO): Promise<string> {
        const aplicacionCambia: Aplicacion = await this.aplicacionRepository.findOne(id);
        if (!aplicacionCambia){
            throw new HttpException('La aplicacion no existe', 404);
        } else {
            aplicacionCambia.setFechaAplicacion(aplicacionDTO.fechaAplicacion);
            // aplicacionCambia.setLoteAplicacion(aplicacion.loteAplicacion);
            // aplicacionCambia.setCampoAplicacion(aplicacion.campoAplicacion);
            await this.aplicacionRepository.save(aplicacionCambia);
            return "Aplicacion modificada.";
        }
    }

    // Eliminar
    public async delAplicacion(id: number) : Promise<Aplicacion[]> { 
        try {
            const aplicacion: Aplicacion = await this.aplicacionRepository.findOne(id);
            if (!aplicacion) { 
                throw new HttpException( { error : `Error buscando la aplicacion con Id: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            await this.aplicacionRepository.delete(id);
            const aplicaciones: Aplicacion[] = await this.aplicacionRepository.find() 
            return aplicaciones;
        } catch (error) { 
            throw new HttpException( { error : `Error eliminando la aplicacion con Id: ${id}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Métodos privados
    public async generarId() {
        try {
            const {max} = await this.aplicacionRepository
            .createQueryBuilder("aplicaciones") 
            .select("MAX(aplicaciones.idAplicacion)+1", "max") 
            .getRawOne();
            let nuevoIdAplicacion: number = max ?? 1; 
            return nuevoIdAplicacion;
        } catch (error) {
            throw new HttpException( { error : `Error obteniendo nuevo id de aplicacion: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

}