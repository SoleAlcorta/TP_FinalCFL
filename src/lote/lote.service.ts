import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteDTO } from './lote.dto';
import { Lote } from './lote.entity';
import { Lote_conIdDTO } from './lote_conId.dto';

@Injectable()
export class LoteService {
    constructor (@InjectRepository(Lote) private readonly loteRepository : Repository<Lote>) {}

    //Consultar
    public async getLotes(): Promise<Lote[]>{
        try {
            const lotes: Lote[] = await this.loteRepository.find()
            console.log(lotes)
            return lotes;           
        } catch (error) { 
            throw new HttpException( { error : `Error al buscar los lotes: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }

    public async getLote(id: number): Promise<Lote>{
     try {
            const lote: Lote = await this.loteRepository.findOne(id)
            console.log(lote)
            return lote;           
        } catch (error) {
            throw new HttpException( { error : `Error al buscar el lote: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    
    //Agregar
    public async addLote(newLote: LoteDTO): Promise<Lote[]> {
        try {
            let idLote: number = await this.generarId();
            let loteCreado = new Lote(idLote, newLote.nombre, newLote.hectareas, newLote.idCampo)
            await this.loteRepository.save(loteCreado);
            const lotes: Lote[] = await this.loteRepository.find()
            return lotes; 

            } catch (error) { 
            throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Hay un error en la solicitud, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    // Actualizar
    public async updLote(lote: Lote_conIdDTO): Promise<Lote[]> { 
        try { 
            const loteCambia: Lote = await this.loteRepository.findOne(lote.idLote);
            if (!loteCambia) { 
                throw new HttpException( { error : `Error buscando el lote de Id: ${lote.idLote}`}, HttpStatus.NOT_FOUND);
            } 
            loteCambia.setNombre(lote.nombre);
            loteCambia.setHectareas(lote.hectareas);
            await this.loteRepository.save(loteCambia); 
            const lotes: Lote[] = await this.loteRepository.find() 
            return lotes; 

        } catch (error) { 
            throw new HttpException({ error : `Error modificando el lote de Id: ${lote.idLote}`}, HttpStatus.NOT_FOUND)
        }
    }
    // Eliminar
    public async delLote(id: number) : Promise<Lote[]> { 
        try {
            const lote: Lote = await this.loteRepository.findOne(id);
            if (!lote) { 
                throw new HttpException( { error : `Error buscando el lote de Id: ${id}`}, HttpStatus.NOT_FOUND);
            } 
            await this.loteRepository.delete(id);
            const lotes: Lote[] = await this.loteRepository.find() 
            return lotes;
        } catch (error) { 
            throw new HttpException( { error : `Error eliminando el lote de Id: ${id}`}, HttpStatus.NOT_FOUND);
        }
    }

    //Métodos privados
    public async generarId() {
        try {
            const {max} = await this.loteRepository
            .createQueryBuilder("lotes") 
            .select("MAX(lotes.idLote)+1", "max") 
            .getRawOne();
            let nuevoIdLote: number = max ?? 1; 
            return nuevoIdLote;
        } catch (error) {
            throw new HttpException( { error : `Error obteniendo nuevo id del lote: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
}
