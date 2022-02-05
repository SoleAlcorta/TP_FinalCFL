"use strick";

//Capturo en variables los inputs
let cmpFecha = document.getElementById("fecha");
let cmpProd = document.getElementById("prod");
let cmpDosis = document.getElementById("dosis");

let dtlCampo = document.getElementById("listaCampos");
let dtlLote = document.getElementById("listaLotes");
let dtlProductos = document.getElementById("listaProductos");

//Capturo los botones
let btnAddCampo = document.getElementById("btnAddCampo");
let btnNvoLote = document.getElementById("btnNvoLote");
let btnAddProd = document.getElementById("btnAddProd");
let btnAddLote = document.getElementById("btnAddLote");

let btnGuardar = document.getElementById("btnFinish");
// btnGuardar.addEventListener("click", guardarDatos);

//Variables donde voy a meter los datos del servidor y urls
let allClientes = [];
let urlCliente = "cliente";
let allCampos = [];
let urlCampo = "campo";
let allLotes = [];
let urlLote = "lote";
let allAplicacion = [];
let allAplicados = [];
let allProductos = [];
let urlProd = "producto";

load(allCampos, urlCampo, dtlCampo);
loadLote();
load(allProductos, urlProd, dtlProductos);

//Cargando datos... Y llenar los datalist.
async function load(entidad, url, datalist) {
    try {
        let response = await fetch(`/${url}`, { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            entidad = await response.json();
            if (url == "campo") {
                mostrarCampos(entidad, datalist);
            } else mostrarProductos(entidad, datalist);           
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

async function loadLote() {
    try {
        let response = await fetch('/lote', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            allLotes = await response.json();
            console.log("aca lotes:"+allLotes);
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}


function mostrarProductos(entidad, datalist) {//mostrar producto
    let datos = '<selec>';
    for (let i = 0; i < entidad.length; i++) {
        datos += `<option>${entidad[i].nombre}</option>`;
    }
    datos += '</select>';
    datalist.innerHTML = datos;
}

function mostrarCampos(entidad, datalist) {
    let datos = '<selec>';
    for (let i = 0; i < entidad.length; i++) {
        datos += `<option value=${entidad[i].idCampo}>${entidad[i].nombre}</option>`;
    }
    datos += '</select>';
    datalist.innerHTML = datos;
}

//Mostrar lotes en el select
dtlCampo.addEventListener('click', mostrarLotes);
function mostrarLotes() {
    let campoSelect = dtlCampo.value;
    let datos = '<selec>';
    for (let i = 0; i < allLotes.length; i++) {
        if (campoSelect == allLotes[i].idCampo) {
            datos += `<option value=${allLotes[i].idLote}>${allLotes[i].nombre}</option>`;
        }
    }
    datos += '</select>';
    dtlLote.innerHTML = datos;
}

//Mostrar las has del lote.
dtlLote.addEventListener('click', () => { 
    let infoHas = document.getElementById('ver has');
    let loteSelect = dtlLote.value;
    for (let i = 0; i < allLotes.length; i++) {
    if (loteSelect == allLotes[i].idLote) {
        infoHas.textContent = `Hectareas: ${allLotes[i].hectareas}`;                      
        }
    }
});