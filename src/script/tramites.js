// const url ='https://raw.githubusercontent.com/matnasama/proyecto-coderhouse/main/data/productos.json';
const tramitesListado ='../src/data/tramites.json';
const containerTramites = document.getElementById('container-tramites');
const sitiosImp ='../src/data/sitiosimportantes.json';
const containerSitios = document.getElementById('container-sitios');

let tramitesAlumnos = [];

class Tramite {
    constructor(id, nombre, descripcion, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        
    }

}

cargarEventosTramites();

function cargarEventosTramites() {

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
    const tramites = await realizarPeticion(tramitesListado);
    recorrerArray(tramites);
}

function recorrerArray(arregloTramites) {
    arregloTramites.forEach((tramite) => {
        const divCardTramites = document.createElement('div');
        divCardTramites.classList.add('card');
        divCardTramites.innerHTML += `
        <h4>${tramite.nombre}</h4>
        <p>$${tramite.descripcion}</p>
        <a id=${tramite.direccion} class="boton" href="#">Agregar</a>
    `;
        containerTramites.appendChild(divCardTramites);
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

let sitiosImportantes = [];

class Sitios {
    constructor(imagen, nombre, id) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.id = id;
    }

}

cargarEventosSitios();

function cargarEventosSitios() {

    document.addEventListener('DOMContentLoaded', () => {
        renderizarSitiosImportantes();
        cargarSitiosImportantesLocalStorage();
    });

}
function cargarSitiosImportantesLocalStorage() {
    sitiosImportantes = JSON.parse(localStorage.getItem('sitiosImportantesLS')) || [];
}

function guardarSitiosImportantesLocalStorage() {
    localStorage.setItem('sitiosImportantesLS', JSON.stringify(sitiosImportantes));
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

async function renderizarSitiosImportantes() {
    // const tramites = await realizarPeticion(url);
    const sitios = await realizarPeticion(sitiosImp);
    recorrerArray(sitios);
}

function recorrerArray(arregloSitios) {
    arregloSitios.forEach((sitio) => {
        const divCardSitios = document.createElement('div');
        divCardSitios.classList.add('card-sitios');
        divCardSitios.innerHTML += `
			<img src="./img/${sitio.img}" alt="${sitio.nombre}" />
			<a id=${sitio.id} class="boton" href="#">Ir al sitio</a>

        `;
        containerSitios.appendChild(divCardSitios);
    });
}


function limpiarContenedorSitiosImportantes() {
    while (containerSitios.firstChild) {
        containerSitios.removeChild(containerSitios.firstChild);
    }
}

function eliminarSitiosLS() {
    localStorage.removeItem('tramiteLS');
}



