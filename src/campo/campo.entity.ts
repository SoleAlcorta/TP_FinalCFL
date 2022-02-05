import { Cliente } from 'src/cliente/cliente.entity';
import { Lote } from 'src/lote/lote.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity('e01_campo')
export class Campo {
    @PrimaryColumn()
    idCampo: number;

    @Column() //nvo dato
    private nombre: string; 

    @Column()
    private ubicacion: string;


    //Relacion con CLIENTE
    @ManyToOne(type => Cliente, cliente => cliente.campos)
    @JoinColumn({ name: "idCliente"})
    public cliente: Cliente; //Esta variable sería la FK, que representa el idCliente?

    //Relacion con LOTE
    @OneToMany(type => Lote, lote => lote.campo)
    public lotes: Lote[]; //Esta sería la FK, que contiene los idLote?
     
    public constructor(campoId:number, name: string, lugar:string, idCliente?:number){
        this.nombre = name; //nuevo dato
        this.idCampo = campoId;
        this.ubicacion = lugar;
        //this.cliente = idCliente; //?
    }

    public getIdCampo():number{ return this.idCampo; };
    public getNombre():string{ return this.nombre; };
    public getUbicacion():string{ return this.ubicacion; };

    public setIdCampo(idCampo:number): void { this.idCampo = idCampo; }
    public setNombre(nombre:string): void { this.nombre = nombre; }
    public setUbicacion(ubicacion:string): void { this.ubicacion = ubicacion; }
}