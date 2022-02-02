import { Cliente } from 'src/cliente/cliente.entity';
import { Lote } from 'src/lote/lote.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity('e01_campo')
export class Campo {
    @PrimaryColumn()
    idCampo: number;

    @Column()
    private ubicacion: string;

    // @Column()
    // private idCliente: number; //Vínculo con la tabla cliente 

    //Relacion con CLIENTE
    @ManyToOne(type => Cliente, cliente => cliente.campos)
    @JoinColumn({ name: "idCliente"})
    public cliente: Cliente; //Esta variable sería la FK, que representa el idCliente?

    //Relacion con LOTE
    @OneToMany(type => Lote, lote => lote.campo)
    public lotes: Lote[]; //Esta sería la FK, que contiene los idLote?
     
    public constructor(campoId:number, lugar:string, idCliente?:number){
        this.idCampo = campoId;
        this.ubicacion = lugar;
        //this.cliente = idCliente; //?
    }

    public getIdCampo():number{
        return this.idCampo;
    }

    public getUbicacion():string{
        return this.ubicacion;
    }

    // public getIdCliente():number{
    //     return this.idCliente;
    // }

    public setIdCampo(idCampo:number): void { this.idCampo = idCampo; }
    public setUbicacion(ubicacion:string): void { this.ubicacion = ubicacion; }
    // public setIdCliente(idCliente:number): void { this.idCliente = idCliente; }

}