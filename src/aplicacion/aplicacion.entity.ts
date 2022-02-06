import { Lote } from 'src/lote/lote.entity';
import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn} from 'typeorm';


@Entity('e01_aplicacion')
export class Aplicacion {
    @PrimaryColumn()
    idAplicacion: number;

    @Column()
    private fechaAplicacion: string;

    @Column()
    private producto: string;

    @Column()
    private dosis: string;

    // @PrimaryColumn() //FK
    // private loteAplicacion: number; 
    
    // @PrimaryColumn() //FK
    // private campoAplicacion: number;
    
    //Relacion con la tabla de PRODUCTOS-APLICACION
    // @OneToMany(type => Productos_Aplicacion, detalleAplicados => detalleAplicados.aplicacion)
    // public detallesProductosAplicados: Productos_Aplicacion[]

    //Relacion con la tabla LOTE. OJO un lote puede tener muchas aplicaciones (en diferentes fechas)
    @ManyToOne (type => Lote, lote => lote.aplicaciones)
    @JoinColumn ({ name: 'idLote'})
    public loteAplicacion: Lote;

    // Relacion con variable idCampo de la tabla lote?
    //ESTA RELACIO NO SÉ SI VA
    // @ManyToOne (type => Lote, loteCampo => loteCampo.loteAplicaciones)
    // @JoinColumn ({ name: 'idCampo'}) //OJO, CHEQUEAR ESTO. No sé cómo se llama esta variable ahora ¿es la variable "campo"?
    // public loteCampo: Lote;
    
    //VER CÓMO QUEDARÍA EL CONSTRUCTOR...
    public constructor(aplicacionId:number, aplicacionFecha:string, aplicacionLote?: Lote, aplicacionProducto?: string, aplicacionDosis?: string/*, aplicacionCampo?: Lote*/){
        this.idAplicacion = aplicacionId;
        this.fechaAplicacion = aplicacionFecha;
        this.loteAplicacion = aplicacionLote;
        this.producto = aplicacionProducto;
        this.dosis = aplicacionDosis;
        // this.loteCampo = aplicacionCampo;
    }

    public getIdAplicacion():number{ return this.idAplicacion; }
    public getFechaAplicacion():string{ return this.fechaAplicacion; }
    // public getLoteAplicacion():number{ return this.loteAplicacion; }
    // public getCampoAplicacion():number{ return this.campoAplicacion; }
    public getProducto():string{ return this.producto};
    public getDosis(): string { return this.dosis};

    public setIdAplicacion(idAplicacion:number): void { this.idAplicacion = idAplicacion; }
    public setFechaAplicacion(fechaAplicacion: string): void{ this.fechaAplicacion = fechaAplicacion; }
    // public setLoteAplicacion(loteAplicacion:number): void{ this.loteAplicacion = loteAplicacion; }
    // public setCampoAplicacion(campoAplicacion:number): void{ this.campoAplicacion = campoAplicacion; }
    public setProducto(producto: string): void { this.producto = producto};
    public setDosis(dosis:string): void{ this.dosis=dosis};

}