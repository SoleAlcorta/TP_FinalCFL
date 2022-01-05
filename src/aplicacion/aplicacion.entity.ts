import { Entity, PrimaryColumn, Column} from 'typeorm';


@Entity('e01_aplicacion')
export class Aplicacion {
    @PrimaryColumn()
    idAplicacion: number;

    @Column()
    private fechaAplicacion: string;

    @Column()
    private loteAplicacion: number;

    @Column()
    private campoAplicacion: number;


    public constructor(aplicacionId:number, aplicacionFecha:string, aplicacionLote:number, aplicacionCampo: number){
        this.idAplicacion = aplicacionId;
        this.fechaAplicacion = aplicacionFecha;
        this.loteAplicacion = aplicacionLote;
        this.campoAplicacion = aplicacionCampo;
    }

    public getIdAplicacion():number{ return this.idAplicacion; }
    public getFechaAplicacion():string{ return this.fechaAplicacion; }
    public getLoteAplicacion():number{ return this.loteAplicacion; }
    public getCampoAplicacion():number{ return this.campoAplicacion; }

    public setIdAplicacion(idAplicacion:number): void { this.idAplicacion = idAplicacion; }
    public setFechaAplicacion(fechaAplicacion: string): void{ this.fechaAplicacion = fechaAplicacion; }
    public setLoteAplicacion(loteAplicacion:number): void{ this.loteAplicacion = loteAplicacion; }
    public setCampoAplicacion(campoAplicacion:number): void{ this.campoAplicacion = campoAplicacion; }

}