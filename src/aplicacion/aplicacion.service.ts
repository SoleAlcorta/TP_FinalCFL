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

    public async addAplicacion(newAplicacion: AplicacionDTO): Promise<Aplicacion[]> {
        
        try {
            let idAplicacion: number = await this.generarId();
            console.log(idAplicacion);
            let aplicacionNueva = new Aplicacion(idAplicacion, newAplicacion.fechaAplicacion, newAplicacion.loteAplicacion, newAplicacion.producto, newAplicacion.dosis/*, newAplicacion.loteCampo*/);
            console.log(newAplicacion);
            await this.aplicacionRepository.save(aplicacionNueva);
            const aplicacion: Aplicacion[] = await this.aplicacionRepository.find();
            return aplicacion;

        } catch (error) { 
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }   
    }

    //Actualizar
    public async updAplicacion(aplicationBody:any): Promise<boolean> {
        const aplicacionCambia: Aplicacion = await this.aplicacionRepository.findOne(aplicationBody.idAplicacion);
        if (!aplicacionCambia){
            throw new HttpException('La aplicacion no existe', 404);
        } else {
            aplicacionCambia.setFechaAplicacion(aplicationBody.fecha);
            aplicacionCambia.setProducto(aplicationBody.producto);
            aplicacionCambia.setDosis(aplicationBody.dosis);
            await this.aplicacionRepository.save(aplicacionCambia);
            return true;
        }
    }

    // Eliminar
    public async delAplicacion(id: number) : Promise<boolean> { 
        try {
            const aplicacion: Aplicacion = await this.aplicacionRepository.findOne(id);
            if (!aplicacion) { 
                throw new HttpException( { error : `Error buscando la aplicacion con Id: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            else{
await this.aplicacionRepository.delete(id);
            const aplicaciones: Aplicacion[] = await this.aplicacionRepository.find() 
            return true;
            }
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