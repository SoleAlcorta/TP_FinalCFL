import { Producto } from 'src/producto/producto.entity';
import { Aplicacion } from 'src/aplicacion/aplicacion.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from 'typeorm';


@Entity('e01_productos_aplicacion')
export class Productos_Aplicacion {
    @PrimaryColumn()
    idAplicacion: number;

    @PrimaryColumn ()
    nroAplicacion: number

    @PrimaryColumn ()
    idProducto: number

    @Column()
    private dosis: string;

    @ManyToOne((type) => Aplicacion, aplicacion => aplicacion.detallesProductosAplicados)
    @JoinColumn({ name: 'idAplicacion' })
    public aplicacion: Aplicacion;

    @ManyToOne((type) => Producto, producto => producto.aplicaciones)
    @JoinColumn({ name: 'idProducto' })
    public producto: Producto;

    public constructor(idAplicacion: number, aplicacionNro: number, idProducto: number, dosis: string){
        this.idAplicacion = aplicacionNro;
        this.nroAplicacion = idAplicacion; 
        this.idProducto = idProducto;
        this.dosis = dosis;
 
    }       

    public getNroAplicacion():number{ return this.nroAplicacion; }
    // public getIdAplicacion():number{ return this.idAplicacion; }
    // public getIdProducto():number{ return this.idProducto; }
    public getDosis():string{ return this.dosis; }

    public setNroAplicacion(nroAplicacion:number): void { this.nroAplicacion = nroAplicacion; }
    // public settIdAplicacion(idAplicacion:number): void{ this.idAplicacion = idAplicacion; }
    // public setIdProducto(idProducto:number): void{ this.idProducto = idProducto; }
    public setDosis(dosis: string): void{ this.dosis = dosis; }

}