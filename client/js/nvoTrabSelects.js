"use strick";

//CAPTURO EN VARIABLES LO NECESARIO
//Datos para aplicacion
let cmpFecha = document.getElementById("fecha");
let cmpProd = document.getElementById("prod");
let cmpDosis = document.getElementById("dosis");

let dtlCampo = document.getElementById("listaCampos");
let dtlLote = document.getElementById("listaLotes");
let dtlProductos = document.getElementById("listaProductos");
let dtlCliente = document.getElementById("listaClientes");

//Capturo los botones
let btnAddCampo = document.getElementById("btnAddCampo");
// btnAddCampo.addEventListener('click', loadCliente); 

// Nuevo Campo
let inpNvoCampo = document.getElementById("nvoEstablecimiento");
let inpNvaUbicacion = document.getElementById("ubicacionNvoCampo");
let inpNvoCuit = document.getElementById("nvoCuit");
let inpNvoCliente = document.getElementById("slcCliente");
let btnListoNvoCamp = document.getElementById("campoNvoListo");
btnListoNvoCamp.addEventListener('click', guardarCampoNvo);

let btnNvoLote = document.getElementById("btnNvoLote");

// Nuevo Lote
let nvoLote = document.getElementById("nvoLote");
let hasNvoLote = document.getElementById("nvasHas1");
let btnListoNvoLote = document.getElementById("nvoLoteListo");
btnListoNvoLote.addEventListener('click', guardarNvoLote);

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
load(allClientes, urlCliente, dtlCliente);

// load(allProductos, urlProd, dtlProductos);

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
            } else mostrarClientes(entidad, datalist);           
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
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
}


// function mostrarProductos(entidad, datalist) {//mostrar producto
//     let datos = '<selec>';
//     for (let i = 0; i < entidad.length; i++) {
//         datos += `<option>${entidad[i].nombre}</option>`;
//     }
//     datos += '</select>';
//     datalist.innerHTML = datos;
// }

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

//#####################################################
// NUEVO CAMPO

function mostrarClientes(entidad, datalist) {
    let datos = '<datalist>';
    for (let i = 0; i < entidad.length; i++) {
        datos += `<option>${entidad[i].razonSocial}</option>`;
    }
    datos += '</datalist>';
    datalist.innerHTML = datos;
}

//MEJORA: QUE MUESTRE EL CUIT EN CASO DE QUE SE SELECCIONES UN CLIENTE YA EXISTENTE.

let todosLosClientes = [];
loadClientes();

async function guardarCampoNvo(){
    try {
        let nombre = inpNvoCampo.value;
        let ubicacion = inpNvaUbicacion.value;
        let razonSocial = inpNvoCliente.value;
        let cuit = inpNvoCuit.value;
        let idCliente = '';
        let control = 0;
        let nvoCampo = {};
        let nvoCliente = {};
        // console.log(todosLosClientes);

        for (let i = 0; i < todosLosClientes.length; i++) {
            if (razonSocial == todosLosClientes[i].razonSocial) {
                control++
                //Si la condicion se cumple, busca el cliente con ese nombre y extrae su id.
                idCliente = todosLosClientes[i].idCliente;
                //Llamaría al método crear campo, pasandole ese id.
                nvoCampo = {
                    "nombre": nombre,
                    "ubicacion": ubicacion,
                    "idCliente": idCliente
                };
                // console.log("El campo con el id ya existente: ");
                // console.log(nvoCampo);
                crear('/campo/new-campo', nvoCampo);
            }
        }
        
        //Si la variable control es 0, significa que no se encontró la razon social en la BD. 
        if (control == 0) {
            //Entonces el nuevo id será 1 más al ya existente (que coincide con el tamaño del arreglo, creo)
            let newIdCliente = todosLosClientes.length +1;
            console.log(newIdCliente);
            
            //Genero el nuevo cliente
            nvoCliente = {
                "razonSocial": razonSocial,
                "cuit": cuit
            }
            crear('/cliente', nvoCliente);
            
            //Genero el nuevo campo
            nvoCampo = {
                "nombre": nombre,
                "ubicacion": ubicacion,
                "idCliente": parceInt(newIdCliente) //No puedo insertar id??
            }
            crear('/campo/new-campo', nvoCampo);
        } 
    } catch (error) {
        console.log("Ha ocurrido un error con el servidor")
    } 
};

async function loadClientes() {
    try {
        let response = await fetch('/cliente', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            todosLosClientes = await response.json();
        } else {
            alert("Error en lectura del servidor")
        }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
};

async function crear(url, objeto) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
    })
    let r = await response.json();
    if (r.status !== "ok") {
        console.log(`Ocurrio un error al crear ${url}`);
    }
};
//Funciona con algunos errores

//######################################################################
//NUEVO LOTE
function guardarNvoLote(){
    let nombre = nvoLote.value;
    let has = hasNvoLote.value;
    let idCampo = dtlCampo.value;
    // console.log("nombre"+nombre);
    // console.log("has"+has);
    // console.log("idCampo"+idCampo);

    let newLote = {
        "nombre": nombre,
        "hectareas": has,
        "idCampo": idCampo
    }
    crear('/lote/new-lote', newLote);
}

