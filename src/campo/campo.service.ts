import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampoDTO } from './campo.dto';
import { Campo } from './campo.entity';
import { Campo_conIdDTO } from './campo_conId.dto';

@Injectable()
export class CampoService {

    constructor (@InjectRepository(Campo) private readonly campoRepository : Repository<Campo>) {}

    //Consultar
    public async getCampos(): Promise<Campo[]>{
        try {
            const campos: Campo[] = await this.campoRepository.find()
            console.log(campos)
            return campos;           
        } catch (error) { 
            throw new HttpException( { error : `Error al buscar los campos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getCampo(id: number): Promise<Campo>{
     try {
            const campo: Campo = await this.campoRepository.findOne(id)
            console.log(campo)
            return campo;           
        } catch (error) {
            throw new HttpException( { error : `Error al buscar el campo: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    
    //Agregar
    public async addCampo(newCampo: CampoDTO): Promise<Campo[]> {
        try {
            let idCampo: number = await this.generarId();
            let campoCreado = new Campo(idCampo, newCampo.ubicacion, newCampo.idCliente)
            await this.campoRepository.save(campoCreado);
            const campos: Campo[] = await this.campoRepository.find()
            return campos; //averiguar cómo retorno sólo el campo creado. O si es mejor así.

            } catch (error) { 
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    // Actualizar
    public async updCampo(campo: Campo_conIdDTO): Promise<Campo[]> { 
        try { 
            const campoCambia: Campo = await this.campoRepository.findOne(campo.idCampo);
            if (!campoCambia) { 
                throw new HttpException( { error : `Error buscando el campo de Id: ${campo.idCampo}`}, HttpStatus.NOT_FOUND);
            } 
            campoCambia.setUbicacion(campo.ubicacion);
            campoCambia.setIdCliente(campo.idCliente);
            await this.campoRepository.save(campoCambia); 
            const campos: Campo[] = await this.campoRepository.find() 
            return campos; 

        } catch (error) { 
            throw new HttpException({ error : `Error modificando el campo de Id: ${campo.idCampo}`}, HttpStatus.NOT_FOUND)
        }
    }
    // Eliminar
    public async delCampo(id: number) : Promise<Campo[]> { 
        try {
            const campo: Campo = await this.campoRepository.findOne(id);
            if (!campo) { 
                throw new HttpException( { error : `Error buscando el campo de Id: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            await this.campoRepository.delete(id);
            const campos: Campo[] = await this.campoRepository.find() 
            return campos;
        } catch (error) { 
            throw new HttpException( { error : `Error eliminando el producto de Id: ${id}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Métodos privados
    public async generarId() {
        try {
            const {max} = await this.campoRepository
            .createQueryBuilder("campos") 
            .select("MAX(campos.idCampo)+1", "max") 
            .getRawOne();
            let nuevoIdCampo: number = max ?? 1; 
            return nuevoIdCampo;
        } catch (error) {
            throw new HttpException( { error : `Error obteniendo nuevo id del campo: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

}