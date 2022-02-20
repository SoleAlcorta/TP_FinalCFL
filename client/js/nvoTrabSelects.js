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
    // console.log(dtlLote.value);
})

let nvoLote = document.getElementById("nvoLote");
let hasNvoLote = document.getElementById("nvasHas1");
let btnListoNvoLote = document.getElementById("nvoLoteListo");
btnListoNvoLote.addEventListener('click', guardarNvoLote);
// btnListoNvoLote.addEventListener('click', () => {
//     guardarNvoLote();
//     loadLote();//Le agregé que actualize el arreglo, una vez finalizado el guardar
//     console.log("Btn listo nvo lote:"); 
//     console.log(allLotes); //No trae el recien creado...
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

let todosLosClientes = [];
loadClientes();

let todosLosCampos = [];
loadCampos();

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
//O deshabilitar el input

// let todosLosClientes = [];
// loadClientes();

// let todosLosCampos = [];
// loadCampos()

//FUNCIONA. Aunque sale null en cliente...
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
        let oldCliente = {};

        let ultimo_idCampo;
        let ultimo_idCliente;

        // console.log(todosLosCampos);
        let ultimoIndice = todosLosCampos.length;
        // console.log("El ultimo indice del arreglo: "+ultimoIndice);
        ultimo_idCampo = todosLosCampos[ultimoIndice-1].idCampo;
        // console.log("El ultimo idCampo: "+ultimo_idCampo);
      
        // console.log(todosLosClientes); 
        let ultimoIndiceCliente = todosLosClientes.length;
        ultimo_idCliente = todosLosClientes[ultimoIndiceCliente-1].idCliente;
        // console.log("El ultimo indice del arreglo de clientes: "+ultimoIndiceCliente);
        // console.log("El ultimo idCliente: "+ultimo_idCliente);

    
        nvoLote = {
                "nombre": loteNvoCampo,
                "hectareas": hasLoteNvoCampo,
                "idCampo": ultimo_idCampo+1
        };
        
        for (let i = 0; i < todosLosClientes.length; i++) { //Para buscar si el cliente cargado ya existe en la BD
            if (razonSocial == todosLosClientes[i].razonSocial) { //FUNCIONA
                console.log("muestro el cliente encontrado...")
                console.log(todosLosClientes[i]); //Hasta acá viene bien

                control++
                //Si la condicion se cumple, busca el cliente con ese nombre y extrae su id.
                idCliente = todosLosClientes[i].idCliente;
                //Llamaría al método crear campo, pasandole ese id.

                oldCliente = {
                    "idCliente": idCliente,
                    "razonSocial": todosLosClientes[i].razonSocial,
                    "cuit": todosLosClientes[i].cuit
                }

                nvoCampo = { //Me guarda cliente como null.
                    "nombre": nombre,
                    "ubicacion": ubicacion,
                    "cliente": /*oldCliente*/idCliente, //No hay caso...
                    "lotes": nvoLote 
                }
                
                console.log("El campo con el id ya existente: ");
                console.log(nvoCampo);
                todosLosCampos.push(nvoCampo);
                // crearCampo(nvoCampo); //A ver si funciona esto...
                crear("campo/new-campo", nvoCampo); 
                loadCampos();
                console.log("Muestro el nuevo campo del viejo cliente:");
                console.log(todosLosCampos);

                allLotes.push(nvoLote)
                crear("lote/new-lote", nvoLote); //FUNCIONA
                loadLote(); 
    
            }
        } 
        
        //Si la variable control es 0, significa que no se encontró la razon social en la BD. 
        if (control == 0) { //FUNCIONA. SOLO NULL EN CLIENTE
            //Entonces el nuevo id será 1 más al ya existente (que coincide con el tamaño del arreglo, creo)
            idCliente = ultimo_idCliente+1;
            console.log("El id del nuevo cliente es: "+idCliente);
            
            //Genero el nuevo cliente
            nvoCliente = {
                "idCliente": idCliente,
                "razonSocial": razonSocial,
                "cuit": cuit
            };

            todosLosClientes.push(nvoCliente);
            crear("cliente", nvoCliente);
            console.log("Clientes actualizados?:");
            console.log(todosLosClientes[todosLosClientes.length-1]);
            loadClientes();
        
            //Genero el nuevo campo. NO TOMA EL VALOR DE CLIENTE... 
            nvoCampo = {
                "nombre": nombre,
                "ubicacion": ubicacion,
                "cliente": /*idCliente*/ nvoCliente, //No hay manera de acomodar esto!!
                "lotes": nvoLote
            };

            todosLosCampos.push(nvoCampo)
            crear("./campo/new-campo", nvoCampo); //FUNCIONA, DATOS NULL EN CLIENTE
            loadCampos();
            // console.log(nvoCampo);
                                                
            //Genero el lote
            allLotes.push(nvoLote)
            crear("lote/new-lote", nvoLote); //FUNCIONA
            loadLote(); 

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
        // if (response.ok) {
            todosLosClientes = await response.json();
        // } else {
        //     alert("Error en lectura del servidor")
        // }
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


async function crear(url, objeto) { //Agregar arreglo para guardar ahí el r?
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
    })
    let r = await response.json();
    if (r.status !== "ok") {
        console.log(`Ocurrio un error al crear ${url}. Status: ${r.status}`);
    }
    console.log(`Console.log del crear de ${url}:`);
    console.log(r);
    getAll();
};
//Funciona con algunos errores

//######################################################################
//NUEVO LOTE
async function guardarNvoLote(){ //FUNCIONA
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
    console.log(newLote);
    // crear("lote/new-lote", newLote);
    let response = await fetch("lote/new-lote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newLote),
    })
    let r = await response.json();
    //Por algún motivo siempre me larga que el status no es ok...
    // if (r.status !== "ok") {
    //     console.log(`Ocurrio un error al crear Lote. Status: ${r.status}`);
    // }
    allLotes = r; //Con esto actualizo el arreglo, debería chequear la funcion crear
    loadLote();
}

//GENERANDO LA APLICACION
function guardarDatosAplicacion() {
    loadLote();
    loadCampos();
    loadClientes();
    //Capturo en variables los inputs
    let f = cmpFecha.value;
    let l = {}; //Chequear cómo armo este lote...
    let campo = dtlCampo.value;
    let lote = dtlLote.value;
    console.log(lote);
    console.log("Aca el dtlLote: ");
    console.log(lote);
    let p = cmpProd.value;
    let d = cmpDosis.value;
    //Puedo modificar la entity para pasarle un arreglo de productos y dosis?

    //Obtener el lote que cree con la funcion anterior:
    console.log(allLotes);
    let ultimoIndiceLote = allLotes.length;
    let loteCreadoAntes = allLotes[ultimoIndiceLote-1];
    console.log(loteCreadoAntes);
    


    if (campo == '') { //En este caso, se trata de un nuevo campo. NO FUNCIONA, SE QUEDA CON LOS DATOS DEL LOTE ANTERIOR
        console.log("Entra al if de nuevo campo");
        // loadLote();
        console.log(loteCreadoAntes); //Esto me trae datos desactualizados... No incorpora el ultimo lote
        let idNvoLote = allLotes.length;

        //Busco el lote del nuevo campo, que está en la última posición del arreglo
        for (let i = 0; i < allLotes.length; i++) {
            
            if (idNvoLote == allLotes[i].idLote) {
                console.log("Entra en el if dentro del for del nuevo campo:");
                console.log(idNvoLote);
                console.log(allLotes[i].idLote);
                //Ambos valores coinciden... Entonces, armo el lote
                l = {
                    "idLote": allLotes[i].idLote,
                    "nombre": allLotes[i].nombre,
                    "hectareas": allLotes[i].hectareas,
                    "idCampo": allLotes[i].idCampo
                } 
            }
        }
    //Generar un if que me diga si el lote se obtiene desde el select o si se trata de un nuevo lote
    } else if (campo != '' && lote == '') { //Si no hay datos en el select de lote:  -- FUNCIONA --
        console.log("Select de lote vacio...");
        console.log(allLotes);
        let idNvoLote = allLotes.length;
        // console.log(idNvoLote);

        //Busco el último lote creado, que esta en la ultima posicion del arreglo
        for (let i = 0; i < allLotes.length; i++) {
            // console.log("Entra al for...");
            // console.log(idNvoLote);
            // console.log(allLotes[i].idLote);

            if (idNvoLote == allLotes[i].idLote) {
                console.log("Entra en el if:");
                console.log(idNvoLote);
                console.log(allLotes[i].idLote);
                //Ambos valores coinciden... Entonces, armo el lote
                l = {
                    "idLote": allLotes[i].idLote,
                    "nombre": allLotes[i].nombre,
                    "hectareas": allLotes[i].hectareas,
                    "idCampo": allLotes[i].idCampo
                } 
            }
        }

    } else { //Cuando son datos de la BD  -- FUNCIONA --
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

    console.log("Muestro el lote creado:");
    console.log(l);

    //Armo los objetos que quiero mandar como body
    let newAplicacion = {
        "fechaAplicacion": f,
        "loteAplicacion": l,
        "producto": p, 
        "dosis": d 
    }   

    console.log("Muestro newAplicacion:");
    console.log(newAplicacion);


    crear("aplicacion/new-aplicacion", newAplicacion); 

}

async function crearLote(unNvoLote){
    let response = await fetch("lote/new-lote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(unNvoLote),
    })
    let r = await response.json();
    allLotes = r;
    console.log(allLotes);
};

async function crearCampo(unNvoCampo){
    let response = await fetch("campo/new-campo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(unNvoCampo),
    })
    let r = await response.json();
    todosLosCampos = r;
    console.log(todosLosCampos);
};

async function getAll() {
    //Carga CAMPOS
    try {
        let responseCmp = await fetch('/campo', { 
            method: "GET",
               headers: {'Content-Type': 'application/json'}
        });
        // if (responseCmp.ok) {
            todosLosCampos = await responseCmp.json();
        // } else {
        //     alert("Error en lectura del servidor")
        // }
    } catch (error) {
        alert("Error en conexion con servidor");
    }
    
    //Carga CLIENTES
        try {
            let responseCli = await fetch('/cliente', { 
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            });
            // if (responseCli.ok) {
                todosLosClientes = await responseCli.json();
          
            // } else {
            //     alert("Error en lectura del servidor")
            // }
        } catch (error) {
            alert("Error en conexion con servidor");
        }
  
    //Carga LOTES
        try {
            let responseLot = await fetch('/lote', { 
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            });
            // if (responseLot.ok) {
                AllLotes = await responseLot.json();
            // } else {
            //     alert("Error en lectura del servidor")
            // }
        } catch (error) {
            alert("Error en conexion con servidor");
        }

}