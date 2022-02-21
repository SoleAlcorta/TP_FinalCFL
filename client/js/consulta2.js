
let botonBuscar = document.getElementById('btnBuscar');
let botonNuevaBusqueda = document.getElementById('btnNuevaBusqueda');
let botonModificar = document.getElementById('btnModificar');
let botonEliminar = document.getElementById('borrarDatos')
let identificacion = document.getElementById('cmpIdentificacion');
let botonBuscar2 = document.getElementById('btnBuscar2');
//let campo = document.getElementById('cmpCampo');
let lote = document.getElementById('cmpLote');
let Fecha = document.getElementById('cmpFecha');
let cmpCampo = document.getElementById("cmpCampo");

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
let resultados = [];
let resultadosAux = [];


//Cargando datos... Y llenar los datalist.
async function loadCampos() { //Carga CAMPOS
    try {
        let response = await fetch('./campo', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {

            campos = await response.json();
            console.log(campos);
            mostrarCampos();
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

async function loadClientes() { //Carga Clientes
    try {
        let response = await fetch('./cliente', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
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

async function loadLote() { //carga lotes
    try {
        let response = await fetch('./lote', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            lotes = await response.json();
            mostrarLotes();
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}


function mostrarClientes() { //muestra los clientes en el select
    let datos = '<select>';
    for (let i = 0; i < productor.length; i++) {
        datos += `<option value=${productor[i].idCliente}>${productor[i].razonSocial}</option>`;
    }
    datos += '</select>';
    identificacion.innerHTML = datos;
    loadCampos();
}

botonBuscar.addEventListener('click', buscarResultados);

function mostrarCampos() { //muestra los campos en el select
    let idDelCliente = Number(document.querySelector('#cmpIdentificacion').value);
    let datos = '<select>';
    for (let i = 0; i < campos.length; i++) {
        if (idDelCliente == campos[i].cliente.idCliente) {
            datos += `<option value=${campos[i].idCampo}>${campos[i].nombre}</option>`;
        }
    }
    datos += '</select>';
    cmpCampo.innerHTML = datos;

    loadLote(); //y carga los lotes
}

identificacion.addEventListener('click', mostrarCampos);

function mostrarLotes() { //muestra los lotes en el select
    let campoSelect = Number(document.querySelector('#cmpCampo').value);
    let datos = '<selec>';
    for (let i = 0; i < lotes.length; i++) {
        if (campoSelect == lotes[i].idCampo) {
            datos += `<option value=${lotes[i].idLote} id=${lotes[i].idLote}>${lotes[i].nombre}</option>`;
        }
    }
    datos += '</select>';
    lote.innerHTML = datos;
    campoSelect = "";
}



async function buscarResultados() {
    try {
        let response = await fetch('./aplicacion', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            resultados = await response.json();
            console.log(resultados);
            mostrarResultadoBusqueda();
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}

botonBuscar.addEventListener('click', buscarResultados);


function mostrarResultadoBusqueda() {

    let idDelLote = Number(document.querySelector("#cmpLote").value);
    let html = "";

    for (let i = 0; i < resultados.length; i++) {
        if (resultados[i].loteAplicacion.idLote == idDelLote) {
            html += `
        <tr>
        <td type=”text” id="hta${i}" value=${resultados[i].hta}>${resultados[i].loteAplicacion.hectareas}</td>
        <td type=”text" id="prodcuto${i}" value=${resultados[i].producto} >${resultados[i].producto}</td>  
        <td type=”text” id=" dosis${i}" value=${resultados[i].dosis} >${resultados[i].dosis}</td>   
        <td type=”text” id="fecha${i}" value=${resultados[i].fechaAplicacion} >${resultados[i].fechaAplicacion}</td>  
        <td> <button id="borrarDatos" class="boton-delete" pos=${resultados[i].idAplicacion}>Borrar </button>
        <button id="modificarDatos" class="boton-update" posit ={i} pos=${resultados[i].idAplicacion}>Modificar</button></td>
           `;
        }
    }
    html += `
            </table>
            `
        ;

    document.getElementById("tablaResultados").innerHTML = html;
    addButtonBehavior("#borrarDatos", btnBorrarClick);
    addButtonBehavior("#modificarDatos",btnActualizarClick);

}

function addButtonBehavior(btnId, fn) {
    let botones = document.querySelectorAll(btnId);
    botones.forEach(boton => {
        boton.addEventListener("click", fn);
    });
}

async function btnBorrarClick() {
    let idAplicacion = this.getAttribute("pos");
    idAplicacion = parseInt(idAplicacion);
    let response = await fetch(`./aplicacion/ ` + idAplicacion, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        }

    }
    )
    
    alertify.confirm("¿Confimar eliminar registro?",
  function(){
    alertify.success('Ok');
     recargarPagina();
  },
  function(){
    alertify.error('Cancel');
  });
  
}

async function btnActualizarClick() {
    if(document.getElementById("updProd").value == ""){
        alert("Error, campos vacios");
        }else{
        
    let idAplicacion = this.getAttribute("pos");
    let producto = document.querySelector('#updProd').value;
    let dosis = document.querySelector('#updDosis').value;
    let fecha = document.querySelector('#updFecha').value;
    let aplicacionBody = {
        "idAplicacion": idAplicacion,
        "producto": producto,
        "dosis": dosis,
        "fecha": fecha
    }
    let response = await fetch('./aplicacion/' + idAplicacion, {
        "method": "PUT",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(aplicacionBody)
    })


   recargarPagina();
   limpiarInput();
}
}
function recargarPagina() {
    buscarResultados();
    mostrarResultadoBusqueda();
   }
   
   
   function recargar() {
     let contador; 
       while (contador != 0) {
         contador--;
       }
       recargarPagina();
   
   };
   
  

mostrarResultadoBusqueda();
function limpiarInput() {
    updProd.value = ""
    updDosis.value = ""
    updFecha.value = ""
}
