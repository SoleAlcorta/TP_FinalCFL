import { Producto } from 'src/producto/producto.entity';
import { Aplicacion } from 'src/aplicacion/aplicacion.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from 'typeorm';


@Entity('e01_productos_aplicacion')
export class Productos_Aplicacion {
    @PrimaryColumn()
    nroAplicacion: number;

    @PrimaryColumn()
    idProducto: number;

    @Column()
    private dosis: string;

    @ManyToOne((type) => Aplicacion, aplicacion => aplicacion.detallesProductosAplicados)
    @JoinColumn({ name: 'idAplicacion' })
    public aplicacion: Aplicacion;

    @ManyToOne((type) => Producto, (producto) => producto.productos)
    @JoinColumn({ name: 'idProducto' })
    public productos: Producto;

    public constructor(aplicacionNro:number, productoId:number, dosis: string, productos? :Producto, aplicacion?: Aplicacion){
        this.nroAplicacion = aplicacionNro;
        this.idProducto = productoId;
        this.dosis = dosis;
        this.productos = productos;
        this.aplicacion = aplicacion; 
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