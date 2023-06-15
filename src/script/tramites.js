// const url ='https://raw.githubusercontent.com/matnasama/proyecto-coderhouse/main/data/productos.json';
const file ='../src/data/tramites.json';
const containerTramites = document.getElementById('container-tramites');
const modal = document.getElementById('ventana-modal');
const modalForm = document.getElementById('ventana-form');

let tramitesAlumnos = [];

class Tramite {
    constructor(id, nombre, descripcion, direccion, img) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.img = img

    }

}

cargarEventos();

function cargarEventos() {

    document.addEventListener('DOMContentLoaded', () => {
        renderizarTramites();
        cargarTramiteLocalStorage();
    });


}
function cargarTramiteLocalStorage() {
    tramitesAlumnos = JSON.parse(localStorage.getItem('tramitesLS')) || [];
}


function guardarTramitesLocalStorage() {
    localStorage.setItem('tramitesLS', JSON.stringify(tramitesAlumnos));
}

async function realizarPeticion(datos) {
    try {
        const response = await fetch(datos);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
      
        console.error(error);
    } 
}

async function renderizarTramites() {
    // const tramites = await realizarPeticion(url);
    const tramites = await realizarPeticion(file);
    recorrerArray(tramites);
}

function recorrerArray(arregloTramites) {
    arregloTramites.forEach((tramite) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
        <img src="./img/${tramite.img}" alt="${tramite.nombre}" />

        <h4>${tramite.nombre}</h4>
        <p>$${tramite.descripcion}</p>
        <a id=${tramite.direccion} class="boton" href="#">Agregar</a>
    `;
        containerTramites.appendChild(divCard);
    });
}

function limpiarContenedorTramites() {
    while (containerTramites.firstChild) {
        containerTramites.removeChild(containerTramites.firstChild);
    }
}


function eliminarTramiteLS() {
    localStorage.removeItem('tramiteLS');
}