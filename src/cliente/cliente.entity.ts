import { Campo } from "src/campo/campo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cliente')
export class Cliente {

    @PrimaryGeneratedColumn()
    private idCliente: number;

    @Column()
    private razonSocial: string;

    @Column()
    private cuit: number;

    @OneToMany(type => Campo, campo => campo.cliente)
     public campos: Campo[];



    constructor(idClient: number, nombre: string, nroCuit: number) {
        this.idCliente = idClient;
        this.razonSocial = nombre;
        this.cuit = nroCuit;

    }
    public setIdCliente(idC:number): void {
         this.idCliente = idC;
    }
    public setCuit(parmCuit:number): void {
        this.cuit = parmCuit;
    }
    public setRazonSocial(razSoc:string): void {
        this.razonSocial=razSoc;
    }





    public getIdCliente(): number {
        return this.idCliente;
    }
    public getCuit(): number {
        return this.cuit;
    }
    public getRazonSocial(): string {
        return this.razonSocial;
    }

}