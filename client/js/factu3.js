"use strict";

let listaCampos = document.getElementById("listaCampos");
let fecha1 = document.getElementById("periodo1");
let fecha2 = document.getElementById("periodo2");
let slctCampo = document.getElementById('listaCampos');
let precio = document.getElementById('precio');
let completarTabla = document.getElementById('carga_datos');
let tabla = document.getElementById("tablaResultados"); //ESTO ES NUEVO
let total = document.getElementById("total"); //ESTO ES NUEVO

let btnImprimir= document.getElementById("btnImprimir");
btnImprimir.addEventListener("click", obtenerAplicaciones);


let campos= [];
let lotes= [];
let aplicaciones= [];

load();
loadLote();
loadAplicacion();

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
    let campoSelect = slctCampo.value; //Esto tiene que usarlo en algún lado...
    let fechaMnr = fecha1.value;
    let fechaMyr = fecha2.value;
    let valor = precio.value;

    // let loteId;
    // let lote_idCampo;
    let lote_nombre;
    let lote_has;

    let aplicFecha;
    // let apli_LoteId;
    let apli_LoteNombre;
    let apli_LoteHas;
    let valorLote;
    let sumatoria = 0;

    let aplicacionesEncontradas = new Array ();
    let indice = 0;


    let info = '<tr>';
    // for (let i = 0; i < aplicaciones.length; i++) {
    //     if (aplicaciones[i].fechaAplicacion >= fechaMnr && aplicaciones[i].fechaAplicacion <= fechaMyr) {
    //         console.log("mostrar algo")
    //         aplicFecha = aplicaciones[i].fechaAplicacion;
    //         apli_LoteId = aplicaciones[i].loteAplicacion.idLote;
    //         console.log("print1"+aplicFecha);
    //         console.log("print2"+apli_LoteId);
    //         console.log(lotes);
    //         for (let a = 0; a < lotes.length; a++) {
    //             if (apli_LoteId == lotes[a].idLote && lotes[a].idCampo == campoSelect) {
    //                 lote_nombre = lotes[a].nombre;
    //                 lote_has = lotes[a].hectareas;
    //                 info += `<td id="fecha">${aplicFecha}</td>
    //                         <td id="lote">${lote_nombre}</td>
    //                         <td id="hta">${lote_has}</td>
    //                         <td id="precio">${lote_has*valor}</td>`
    //                 // console.log("print3"+aplicFecha);
    //                 // console.log("print4"+lote_nombre);
    //                 // console.log("print5"+lote_has);
    //                 // console.log("print6"+lote_has*valor);                    
    //             } //el resultado del precio debería guardarse en una variable para ir haciendose la sumatoria. Cómo??
    //         }
    //     }
    // }
    // info += '</tr>'
    // // console.log(info);
    // completarTabla.innerHTML = info;
    for (let i = 0; i < aplicaciones.length; i++) {
        if (aplicaciones[i].fechaAplicacion >= fechaMnr && aplicaciones[i].fechaAplicacion <= fechaMyr) {
            aplicacionesEncontradas[indice] = aplicaciones[i]; 
            // console.log("mostrar algo");
            // console.log(aplicacionesEncontradas[indice]);
            // aplicFecha = aplicaciones[i].fechaAplicacion;
            // console.log("fecha "+aplicFecha);
            // apli_LoteNombre = aplicaciones[i].loteAplicacion.nombre;
            // console.log("nombre lote "+apli_LoteNombre);
            // apli_LoteHas = aplicaciones[i].loteAplicacion.hectareas;
            // console.log("has "+apli_LoteHas);
            // valorLote = apli_LoteHas*valor;
            // console.log("valor lote: "+valorLote);

            // sumatoria = sumatoria + valorLote;

            indice++;

            // info += `<td id="fecha">${aplicFecha}</td>
            //         <td id="lote">${apli_LoteNombre}</td>
            //         <td id="hta">${apli_LoteHas}</td>
            //         <td id="precio">${valorLote}</td>`
        } 
    }
    // info += '</tr>'
    // console.log(info);
    // completarTabla.innerHTML = info;
    // console.log("El arreglo completo: ")
    // console.log(aplicacionesEncontradas);

    //Recorrer el arreglo con las aplicaciones encontradas...
    for (let i = 0; i < aplicacionesEncontradas.length; i++) {
        aplicFecha = aplicacionesEncontradas[i].fechaAplicacion;
        apli_LoteNombre = aplicacionesEncontradas[i].loteAplicacion.nombre;
        console.log("nombre lote "+apli_LoteNombre);
        apli_LoteHas = aplicacionesEncontradas[i].loteAplicacion.hectareas;
        // console.log("has "+apli_LoteHas);
        valorLote = apli_LoteHas*valor;
        // console.log("valor lote: "+valorLote);

        sumatoria = sumatoria + valorLote;

        info += `<td>${aplicFecha}</td>
                <td>${apli_LoteNombre}</td>
                <td>${apli_LoteHas}</td>
                <td>${valorLote}</td>`
        info += '</tr>'
        // completarTabla.innerHTML = info;
        // let renglon = document.createElement(info);

        tabla.insertAdjacentHTML("beforeend", info);
    }
    console.log("Sumatoria: "+sumatoria);
    total.innerHTML = `$${sumatoria}`;
} 