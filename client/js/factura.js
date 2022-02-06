let listaCampos= document.getElementById("listaCampos");

let btnImprimir= document.getElementById("btnImprimir");
btnImprimir.addEventListener("click", consultas);

load();

function imprimir(){

    console.log(nombre.value);
    console.log(campo.value);
    console.log(periodo1.value);
    console.log(periodo2.value);

}

async function consultas(){
    let nombre=document.getElementById("nombre");
    //let campo=document.getElementById("campo");
    let periodo1=document.getElementById("periodo1");
    let periodo2=document.getElementById("periodo2");
    
        let data = {
            "nombre": nombre.value,
           //"campo": campo.value,
            "periodo1": periodo1.value,
            "periodo2": periodo2.value
        }

        let response = await fetch('./aplicacion',
         {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(data)
        });
        if (await response.json()) {
            let prueba=response.json;
            console.log(prueba);
        }
        else {
            let alert =
                    `<div class="alert alert-primary" id="alerta" role="alert"> Usuario o Contraseña inválido </div>
                    <button type="button" class="btn btn-primary btn-consultas" id="btn_modal">Volver</button>`
                formularioLogin.innerHTML = alert;
                let botonVolver = document.getElementById("btn_modal");
                botonVolver.addEventListener("click", volver);
        }
    }

let campos= [];
let lotes= [];
let aplicaciones= [];

async function load() {
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

async function loadAplicacion() {
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

function mostrarCampos() {
    let datos = '<selec>';
    for (let i = 0; i < campos.length; i++) {
        datos += `<option value=${campos[i].idCampo}>${campos[i].nombre}</option>`;
    }
    datos += '</select>';
    listaCampos.innerHTML = datos;
}

function mostrarLotes() {
    let campoSelect = listaCampos.value;
    let datos = '<selec>';
    for (let i = 0; i < lotes.length; i++) {
        if (campoSelect == lotes[i].idCampo) {

        }
    }
    dtlLote.innerHTML = datos;
}