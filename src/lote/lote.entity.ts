import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity('e01_lote')
export class Lote {
    @PrimaryColumn()
    idLote: number;

    @Column()
    private nombre: string;

    @Column()
    private hectareas: number;

    @Column()
    private idCampo: number; //Vínculo con la tabla campo

    public constructor(loteId:number, nombre:string, hectareas:number, idCampo:number){
        this.idLote = loteId;
        this.nombre = nombre;
        this.hectareas = hectareas;
        this.idCampo = idCampo;
    }

    public getIdLote():number{
        return this.idLote;
    }

    public getNombre():string{
        return this.nombre;
    }

    public getHectareas():number{
        return this.hectareas;
    }

    public getIdCampo():number{
        return this.idCampo;
    }

    public setIdLote(idLote:number): void { this.idLote = idLote; }
    public setNombre(nombre:string): void { this.nombre = nombre; }
    public setHectareas(hectareas:number): void { this.hectareas = hectareas; }
    public setIdCampo(idCampo:number): void { this.idCampo = idCampo; }

}