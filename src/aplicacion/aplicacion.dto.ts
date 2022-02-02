import { Lote } from "src/lote/lote.entity";

export class AplicacionDTO {
    readonly fechaAplicacion: string;
    readonly loteAplicacion: Lote;
    // readonly loteCampo: Lote;
}