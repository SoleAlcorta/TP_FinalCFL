import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity('e01_campo')
export class Campo {
    @PrimaryColumn()
    idCampo: number;

    @Column()
    private ubicacion: string;

    @Column()
    private idCliente: number; //Vínculo con la tabla cliente 

    public constructor(campoId:number, lugar:string, idCliente:number){
        this.idCampo = campoId;
        this.ubicacion = lugar;
        this.idCliente = idCliente;
    }

    public getIdCampo():number{
        return this.idCampo;
    }

    public getUbicacion():string{
        return this.ubicacion;
    }

    public getIdCliente():number{
        return this.idCliente;
    }

    public setIdCampo(idCampo:number): void { this.idCampo = idCampo; }
    public setUbicacion(ubicacion:string): void { this.ubicacion = ubicacion; }
    public setIdCliente(idCliente:number): void { this.idCliente = idCliente; }

}