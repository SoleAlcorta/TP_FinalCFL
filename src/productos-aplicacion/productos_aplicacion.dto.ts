import { Aplicacion } from "src/aplicacion/aplicacion.entity";
import { Producto } from "src/producto/producto.entity";

export class Productos_AplicacionDTO {
    readonly idAplicacion: Aplicacion;
    readonly idProducto: Producto;
    readonly dosis: string;
}