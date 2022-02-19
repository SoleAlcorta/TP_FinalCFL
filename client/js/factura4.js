let fecha1= document.getElementById("periodo1");
let fecha2= document.getElementById("periodo2");
let btnBuscar = document.getElementById('btnBuscar');  
let btnNuevaFactura = document.getElementById ('btnNuevaFactura');
let tablaResultados = document.getElementById("tablaResultados");
let total = document.getElementById("total");
let nombre = document.getElementById('cmpNombre'); 
let campo = document.getElementById('cmpCampo');
let lote = document.getElementById('cmpLote');


loadClientes();
//loadCampos();
//loadLote();
loadAplicaciones();

let productor = [];
let campos = [];
let lotes =[];
let aplicaciones = [];


//Cargando datos... Y llenar los datalist.
async function loadCampos() { //Carga CAMPOS
    try {
        let response = await fetch('./campo', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
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
    document.getElementById("tablaFactura").style.visibility="hidden";

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

async function loadLote() { //carga lotes
    try {
        let response = await fetch('./lote', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
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

async function loadAplicaciones() { //Carga APLICACIONES
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

//Muestra los datalist.
function mostrarClientes() { //muestra los clientes en el select
    let datos = '<select>';
    for (let i = 0; i < productor.length; i++) {
        datos += `<option value=${productor[i].idCliente}>${productor[i].razonSocial}</option>`;
    }
    datos += '</select>';
    nombre.innerHTML = datos;
  loadCampos();
}

function mostrarCampos() {
    let idDelCliente = Number(document.querySelector('#cmpNombre').value);
    let datos = '';
    for (let i = 0; i < campos.length; i++) {
        if(idDelCliente == campos[i].cliente.idCliente){
        datos += `<option value=${campos[i].idCampo} pos=${campos[i].idCampo} onchange="loadLote()">${campos[i].nombre}</option>`;
        }
    }
    datos += '</select>';
    cmpCampo.innerHTML = datos;
    
}

function mostrarLotes() {
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

nombre.addEventListener('click', mostrarCampos);
btnBuscar.addEventListener('click', obtenerAplicaciones);



function obtenerAplicaciones() {
    
        let idDelLote= Number(document.querySelector("#cmpLote").value);
        let idDelCli = Number(document.querySelector('#cmpNombre').value);
        let campoSel = Number(document.querySelector('#cmpCampo').value);
        let fechaMnr = fecha1.value; //llega tipo string
        let fechaMyr = fecha2.value;
        let aplicFecha;
        let apli_IdLote;
        let apli_LoteHas;
        let valorHectarea = Number(document.querySelector("#precioHecterea").value);
        let sumatoria = 0;
        let aplicacionesEncontradas = new Array ();
        let aplicacionesFiltradas = new Array();
        let html = "";


        document.getElementById('periodos').style.display = "none";
        document.getElementById('precioHecterea').style.display = "none";
        document.getElementById('btnBuscar').style.display = "none";
        document.getElementById("tablaFactura").style.visibility="visible";



    for(let ind=0; ind < aplicaciones.length;ind++){
        if((aplicaciones[ind].loteAplicacion.idCampo == campoSel) && (aplicaciones[ind].loteAplicacion.idLote == idDelLote)){
            aplicacionesEncontradas.push(aplicaciones[ind]);
        }
    }
    
    for (let i = 0; i < aplicacionesEncontradas.length; i++){
     
        if ((aplicacionesEncontradas[i].fechaAplicacion >= fechaMnr) && (aplicacionesEncontradas[i].fechaAplicacion <= fechaMyr)) {
            aplicacionesFiltradas.push(aplicacionesEncontradas[i]);
        }   

   }
    console.log(aplicacionesFiltradas);
        
   for (let i = 0; i < aplicacionesFiltradas.length; i++) {
              
                aplicFecha = aplicacionesFiltradas[i].fechaAplicacion;
                apli_IdLote = aplicacionesFiltradas[i].loteAplicacion.idLote;   
                apli_LoteHas = aplicacionesFiltradas[i].loteAplicacion.hectareas;
                valorLote = apli_LoteHas* (valorHectarea) ;
                sumatoria = sumatoria + valorLote;
    
                html += `<tr> 
                    <td type=”text”>${aplicFecha}</td>
                    <td type=”text”>${apli_IdLote}</td>  
                    <td type=”text”>${apli_LoteHas}</td>   
                    <td type=”text”>${valorLote}</td> 
                </tr>`
                }
                html += `
                </table>
                `
        
        document.getElementById("tablaResultados").innerHTML = html;
        total.innerHTML = `$${sumatoria}`;
        idDelLote = "";

    }

    function recargar(){
        window.location.href = './factura4.html';
    }



    btnNuevaFactura.addEventListener("click",recargar);