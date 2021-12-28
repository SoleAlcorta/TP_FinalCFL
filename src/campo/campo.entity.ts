import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('e01_campo')
export class Campo {
    @PrimaryGeneratedColumn()
    idCampo: number;

    @Column()
    private ubicacion: string;

    @Column()
    private propietario: string; /*(?)*/ 

    public constructor(campoId:number, lugar:string, dueño:string){
        this.idCampo = campoId;
        this.ubicacion = lugar;
        this.propietario = dueño;
    }

    public getIdCampo():number{
        return this.idCampo;
    }

    public getUbicacion():string{
        return this.ubicacion;
    }

    public getPropietario():string{
        return this.propietario;
    }

}