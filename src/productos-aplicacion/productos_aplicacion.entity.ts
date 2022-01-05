import { Entity, PrimaryColumn, Column} from 'typeorm';


@Entity('e01_productos_aplicacion')
export class Productos_Aplicacion {
    @PrimaryColumn()
    nroAplicacion: number;

    @Column()
    private idAplicacion: number;

    @Column()
    private idProducto: number;

    @Column()
    private dosis: string;


    public constructor(aplicacionNro:number, aplicacionId:number, productoId:number, dosis: string){
        this.nroAplicacion = aplicacionNro;
        this.idAplicacion = aplicacionId;
        this.idProducto = productoId;
        this.dosis = dosis;
    }

    public getNroAplicacion():number{ return this.nroAplicacion; }
    public getIdAplicacion():number{ return this.idAplicacion; }
    public getIdProducto():number{ return this.idProducto; }
    public getDosis():string{ return this.dosis; }

    public setNroAplicacion(nroAplicacion:number): void { this.nroAplicacion = nroAplicacion; }
    public settIdAplicacion(idAplicacion:number): void{ this.idAplicacion = idAplicacion; }
    public setIdProducto(idProducto:number): void{ this.idProducto = idProducto; }
    public setDosis(dosis: string): void{ this.dosis = dosis; }

}