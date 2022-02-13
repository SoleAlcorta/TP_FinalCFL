let botonBuscar = document.getElementById ('btnBuscar');  
let botonNuevaBusqueda = document.getElementById ('btnNuevaBusqueda');
let botonModificar = document.getElementById ('btnModificar');
let botonEliminar = document.getElementById ('btnEliminar');
let identificacion = document.getElementById('cmpIdentificacion'); 
//let campo = document.getElementById('cmpCampo');
let lote = document.getElementById('cmpLote');
let Fecha = document.getElementById('cmpFecha');
let cmpCampo= document.getElementById("cmpCampo");


// botonBuscar.addEventListener('click', load);
// botonNuevaBusqueda.addEventListener('click');
// botonModificar.addEventListener ('click');
// botonEliminar.addEventListener ('click');
loadClientes();
loadCampos();
loadLote();

let productor = [];

let campos = [];

let fechas = [];
let lotes = [];

let has = [];
let aplicacion = [];

let dosis = [];




//Cargando datos... Y llenar los datalist.
async function loadCampos() { //Carga CAMPOS
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

async function loadClientes() { //Carga CAMPOS
    try {
        let response = await fetch('./cliente', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            productor = await response.json();
            mostrarClientes();  
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

async function loadLote() {
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

function mostrarClientes() {
    let datos = '<selec>';
    for (let i = 0; i < productor.length; i++) {
        datos += `<option value=${productor[i].idCliente}>${productor[i].razonSocial}</option>`;
    }
    datos += '</select>';
    identificacion.innerHTML = datos;
}

function mostrarCampos() {
    let datos = '<selec>';
    for (let i = 0; i < campos.length; i++) {
        datos += `<option value=${campos[i].idCampo}>${campos[i].nombre}</option>`;
    }
    datos += '</select>';
    cmpCampo.innerHTML = datos;
}

cmpCampo.addEventListener('click', mostrarLotes);
function mostrarLotes() {
    let campoSelect = cmpCampo.value;
    let datos = '<selec>';
    for (let i = 0; i < lotes.length; i++) {
        if (campoSelect == lotes[i].idCampo) {
            datos += `<option value=${lotes[i].idLote}>${lotes[i].nombre}</option>`;
        }
    }
    datos += '</select>';
    lote.innerHTML = datos;
}
