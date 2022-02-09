"use strick";

let listaCampos = document.getElementById("listaCampos");
let fecha1 = document.getElementById("periodo1");
let fecha2 = document.getElementById("periodo2");
let slctCampo = document.getElementById('listaCampos');
let precio = document.getElementById('precio');
let completarTabla = document.getElementById('carga_datos');
// let alojarResultados = document.getElementById('listado');


let btnImprimir= document.getElementById("btnImprimir");
// btnImprimir.addEventListener("click", consultas);
btnImprimir.addEventListener("click", obtenerAplicaciones);


let campos= [];
let lotes= [];
let aplicaciones= [];

load();
loadLote();
loadAplicacion();
// function imprimir(){

//     console.log(nombre.value);
//     console.log(campo.value);
//     console.log(periodo1.value);
//     console.log(periodo2.value);

// }

// async function consultas(){
//     let nombre=document.getElementById("nombre");
//     //let campo=document.getElementById("campo");
//     let periodo1=document.getElementById("periodo1");
//     let periodo2=document.getElementById("periodo2");
    
//         let data = {
//             "nombre": nombre.value,
//            //"campo": campo.value,
//             "periodo1": periodo1.value,
//             "periodo2": periodo2.value
//         }

//         let response = await fetch('./aplicacion',
//          {
//             "method": "GET",
//             "headers": {
//                 'Content-Type': 'application/json'
//             },
//             "body": JSON.stringify(data)
//         });
//         if (await response.json()) {
//             let prueba=response.json;
//             console.log(prueba);
//         }
//         else {
//             let alert =
//                     `<div class="alert alert-primary" id="alerta" role="alert"> Usuario o Contraseña inválido </div>
//                     <button type="button" class="btn btn-primary btn-consultas" id="btn_modal">Volver</button>`
//                 formularioLogin.innerHTML = alert;
//                 let botonVolver = document.getElementById("btn_modal");
//                 botonVolver.addEventListener("click", volver);
//         }
//     }


//Carga 

async function load() { //Carga CAMPOS
    try {
        let response = await fetch('./campo', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            campos = await response.json();
            mostrarCampos();        
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

async function loadLote() { //Carga LOTES
    try {
        let response = await fetch('./lote', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            lotes = await response.json();
            //Llamaria a la funcion mostrar lotes?
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

async function loadAplicacion() { //Carga APLICACIONES
    try {
        let response = await fetch('./aplicacion', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
           aplicaciones = await response.json();
            //Llamaria a la funcion mostrar aplicaciones?
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

//Muestra los campos para seleccionar
function mostrarCampos() {
    let datos = '<selec>';
    for (let i = 0; i < campos.length; i++) {
        datos += `<option value=${campos[i].idCampo}>${campos[i].nombre}</option>`;
    }
    datos += '</select>';
    listaCampos.innerHTML = datos;
}

function generarTabla() {
    let campoSelect = listaCampos.value;
    let lotes_campo = [];
    // let datos = '<selec>'; //Ojo, ya no quiero un select
    for (let i = 0; i < lotes.length; i++) {
        if (campoSelect == lotes[i].idCampo) {
            //Debería guardar los idLote en un arreglo para 
            //después buscarlos en las aplicaciones
        }
    }
    console.log(lotes_campo);
    // dtlLote.innerHTML = datos;
}

function obtenerAplicaciones() {
    let campoSelect = slctCampo.value;
    let fechaMnr = fecha1.value;
    let fechaMyr = fecha2.value;
    let valor = precio.value;

    // let loteId;
    // let lote_idCampo;
    let lote_nombre;
    let lote_has;
    let a = undefined;
    // console.log(campoSelect);
    // console.log(fechaMnr);
    // console.log(fechaMyr);

    let aplicFecha;
    let apli_LoteId;
    let info = '<tr>';
    for (let i = 0; i < aplicaciones.length; i++) {
        if (aplicaciones[i].fechaAplicacion >= fechaMnr && aplicaciones[i].fechaAplicacion <= fechaMyr) {
            console.log("mostrar algo")
            aplicFecha = aplicaciones[i].fechaAplicacion;
            apli_LoteId = aplicaciones[i].loteAplicacion.idLote;
            console.log("print1"+aplicFecha);
            console.log("print2"+apli_LoteId);
            for (a = 0; a < aplicaciones.length; a++) {
                if (apli_LoteId == lotes[a].idLote && lotes[a].idCampo == campoSelect) {
                    lote_nombre = lotes[a].nombre;
                    lote_has = lotes[a].hectareas;
                    info += `<td id="fecha">${aplicFecha}</td>
                            <td id="lote">${lote_nombre}</td>
                            <td id="hta">${lote_has}</td>
                            <td id="precio">${lote_has*valor}</td>`
                    // console.log("print3"+aplicFecha);
                    // console.log("print4"+lote_nombre);
                    // console.log("print5"+lote_has);
                    // console.log("print6"+lote_has*valor);                    
                } //el resultado del precio debería guardarse en una variable para ir haciendose la sumatoria. Cómo??
            }
        }
    }
    info += '</tr>'
    // console.log(info);
    completarTabla.innerHTML = info;
} 