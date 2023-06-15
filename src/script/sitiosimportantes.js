// const url ='https://raw.githubusercontent.com/matnasama/proyecto-coderhouse/main/data/productos.json';
const file ='../src/data/sitiosimportantes.json';
const containerSitios = document.getElementById('container-sitios');
const modal = document.getElementById('ventana-modal');
const modalForm = document.getElementById('ventana-form');


let sitiosImportantes = [];


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});

class Sitios {
    constructor(imagen, nombre, id) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.id = id;
    }

}

cargarEventos();

function cargarEventos() {

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
    const sitios = await realizarPeticion(file);
    recorrerArray(sitios);
}

function recorrerArray(arregloSitios) {
    arregloSitios.forEach((sitio) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
			<img src="./img/${sitio.img}" alt="${sitio.nombre}" />
			<a id=${sitio.id} class="boton" href="#">Ir al sitio</a>

        `;
        containerSitios.appendChild(divCard);
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



