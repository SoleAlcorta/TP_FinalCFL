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

// Nuevo Campo
let btnAddCampo = document.getElementById("btnAddCampo");
// btnAddCampo.addEventListener('click', loadCliente); 

let inputsNvoCampo = document.getElementById("nvoCampo")
let inputsNvoLote = document.getElementById("inputsNvoLote");
let inpNvoCampo = document.getElementById("nvoEstablecimiento");
let inpNvaUbicacion = document.getElementById("ubicacionNvoCampo");
let inpNvoCuit = document.getElementById("nvoCuit");
let inpNvoCliente = document.getElementById("slcCliente");
let inpLoteNvoCampo = document.getElementById("nvoLote_yCampo");
let inpHasLoteNvoCmp = document.getElementById("hasNvoLote_yCampo");
let btnListoNvoCamp = document.getElementById("campoNvoListo");
btnListoNvoCamp.addEventListener('click', guardarCampoNvo);

btnAddCampo.addEventListener('click', () => {
    dtlCampo.value = 0;
    dtlLote.value = 0;
    inputsNvoCampo.classList.toggle("nvoElemento");
})

// Nuevo Lote
let btnNvoLote = document.getElementById("btnNvoLote");
btnNvoLote.addEventListener('click', () => {
    dtlLote.value = 0;
    inputsNvoLote.classList.toggle("nvoElemento");
    console.log(dtlLote.value);
})

let nvoLote = document.getElementById("nvoLote");
let hasNvoLote = document.getElementById("nvasHas1");
let btnListoNvoLote = document.getElementById("nvoLoteListo");
btnListoNvoLote.addEventListener('click', guardarNvoLote);
// btnListoNvoLote.addEventListener('click', () => {
//     let nombre = nvoLote.value;
//     let has = hasNvoLote.value;
//     let idCampo = dtlCampo.value;

//     guardarNvoLote(nombre, has, idCampo);
// });


// let btnAddProd = document.getElementById("btnAddProd");
// let btnAddLote = document.getElementById("btnAddLote");

//Guardar aplicacion
let btnGuardar = document.getElementById("btnFinish");
btnGuardar.addEventListener("click", guardarDatosAplicacion);

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

let todosLosCampos = [];
loadCampos()

async function guardarCampoNvo(){
    try {
        let nombre = inpNvoCampo.value;
        let ubicacion = inpNvaUbicacion.value;
        let razonSocial = inpNvoCliente.value;
        let cuit = inpNvoCuit.value;
        let loteNvoCampo = inpLoteNvoCampo.value;
        let hasLoteNvoCampo = inpHasLoteNvoCmp.value;

        let idCliente = '';
        let control = 0;
        let nvoCampo = {};
        let nvoCliente = {};
        let nvoLote = {};

        for (let i = 0; i < todosLosClientes.length; i++) {
            if (razonSocial == todosLosClientes[i].razonSocial) {
                control++
                //Si la condicion se cumple, busca el cliente con ese nombre y extrae su id.
                idCliente = todosLosClientes[i].idCliente;
                //Llamaría al método crear campo, pasandole ese id.
                nvoCampo = {
                    "nombre": nombre,
                    "ubicacion": ubicacion,
                    "cliente": {
                        "idCliente": idCliente,
                        "razonSocial": razonSocial,
                        "cuit": todosLosClientes[i].cuit
                    },
                };
                // console.log("El campo con el id ya existente: ");
                // console.log(nvoCampo);
                crear("/campo/new-campo", nvoCampo);
            }
        }
        
        //Si la variable control es 0, significa que no se encontró la razon social en la BD. 
        if (control == 0) {
            //Entonces el nuevo id será 1 más al ya existente (que coincide con el tamaño del arreglo, creo)
            idCliente = todosLosClientes.length +1;
            // console.log(newIdCliente);
            
            //Genero el nuevo cliente
            nvoCliente = {
                "idCliente": idCliente,
                "razonSocial": razonSocial,
                "cuit": cuit
            };
            crear("/cliente", nvoCliente); //FUNCIONA
            
            //Genero el nuevo campo
            nvoCampo = {
                "nombre": nombre,
                "ubicacion": ubicacion,
                "cliente": nvoCliente
            };
                
            crear("campo/new-campo", nvoCampo); //FUNCIONA, DATOS NULL EN CLIENTE

        }
        
        //Debería tambien crear el lote, pero no estoy pudiendo    

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

async function loadCampos() {
    try {
        let response = await fetch('/campo', { 
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            todosLosCampos = await response.json();
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
        console.log(`Ocurrio un error al crear ${url}, muestro status: ${r.status}`);
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
    crear("lote/new-lote", newLote);
}

//GENERANDO LA APLICACION
function guardarDatosAplicacion() {
    //Capturo en variables los inputs
    let f = cmpFecha.value;
    let l = {}; //Chequear cómo armo este lote...
    let lote = dtlLote.value;
    console.log(lote);
    console.log("Aca el dtlLote: ");
    console.log(lote);
    let p = cmpProd.value;
    let d = cmpDosis.value;
    //Puedo modificar la entity para pasarle un arreglo de productos y dosis?

    //Generar un if que me diga si el lote se obtiene desde el select
    //o si se trata de un nuevo lote

    if (lote == '') {
        console.log("Mostrame esta!");
        let loteName = nvoLote.value;
        //Debería volver a hacer el load p q me traiga los datos nuevis
        
        for (let i = 0; i < allLotes.length; i++) {
            if (loteName == allLotes[i].nombre) {
                l = {
                    "idLote": allLotes[i].idLote,
                    "nombre": allLotes[i].nombre,
                    "hectareas": allLotes[i].hectareas,
                    "idCampo": allLotes[i].idCampo
                }
            }
        } 
    } else {
        console.log("Hay datos en el dtl");
        let loteSelect = dtlLote.value;
        for (let i = 0; i < allLotes.length; i++) {
            if (loteSelect == allLotes[i].idLote) {
                l = {
                    "idLote": allLotes[i].idLote,
                    "nombre": allLotes[i].nombre,
                    "hectareas": allLotes[i].hectareas,
                    "idCampo": allLotes[i].idCampo
                }; 
            };
        };
    };

    // if (lote != '') {
    //     let loteSelect = dtlLote.value;
    //     for (let i = 0; i < allLotes.length; i++) {
    //         if (loteSelect == allLotes[i].idLote) {
    //             l = {
    //                 "idLote": allLotes[i].idLote,
    //                 "nombre": allLotes[i].nombre,
    //                 "hectareas": allLotes[i].hectareas,
    //                 "idCampo": allLotes[i].idCampo
    //             }; 
    //         };
    //     };   //HASTA ACÁ FUNCIONA
    // } else if (lote == "<empty string>") { //Por algun motivo dtl siempre llega como cadena vacia...
    //     console.log("Entra al else?");
    //     let loteName = nvoLote.value;
    //     console.log(loteName)
    //     for (let i = 0; i < allLotes.length; i++) {
    //         if (loteName == allLotes[i].nombre) {
    //             l = {
    //                 "idLote": allLotes[i].idLote,
    //                 "nombre": allLotes[i].nombre,
    //                 "hectareas": allLotes[i].hectareas,
    //                 "idCampo": allLotes[i].idCampo
    //             }
    //         }
    //     }  
    // };

    //Armo los objetos que quiero mandar como body
    let newAplicacion = {
        "fechaAplicacion": f,
        "loteAplicacion": l,
        "producto": p, 
        "dosis": d 
    }   

    crear("aplicacion/new-aplicacion", newAplicacion);

}

//MANEJO DE PRODUCTOS?
//Puedo crear un arreglo e ir metiendo ahí los datos?
// let dimensionArreglo = document.getElementById("cantidadProd");
// let productos = new Array (dimensionArreglo);
// let dosis = new Array (dimensionArreglo);
// //Cargo los datos en esos arreglos...
// for (let i = 0; i < dimensionArreglo; i++) {
//     productos[i] = input del producto
//     dosis [i] = input dosis
// }
