import { Aplicacion } from 'src/aplicacion/aplicacion.entity';
import { Campo } from 'src/campo/campo.entity';
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

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

    //Relacion con la tabla APLICACION
    @OneToMany(type => Aplicacion, aplicacion => aplicacion.loteAplicacion)
     public aplicaciones: Aplicacion[];
    
    //Esta relacion no sé cómo hacerla. Es la que relaciona el idCampo con la aplicacion.
    //  @OneToMany(type => Aplicacion, aplicacion => aplicacion.loteCampo)
    //  public loteAplicaciones: Aplicacion[];

     @ManyToOne(type => Campo, campo => campo.lotes)
     @JoinColumn({ name: "idCampo"})
      public campo: Campo;

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