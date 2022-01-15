import { Productos_Aplicacion } from 'src/productos-aplicacion/productos_aplicacion.entity';
import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';

@Entity('e01_producto')
export class Producto {
    @PrimaryColumn()
    idProducto: number;

    @Column()
    private nombre: string;

    @OneToMany((type) => Productos_Aplicacion, producto => producto.productos)
    public productos : Productos_Aplicacion[];

    public constructor(productoId:number, nombre:string){
        this.idProducto = productoId;
        this.nombre = nombre;
    }

    public getIdProducto():number{
        return this.idProducto;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setIdProducto(idProducto:number): void { this.idProducto = idProducto; }
    public setNombre(nombre:string): void { this.nombre = nombre; }

}