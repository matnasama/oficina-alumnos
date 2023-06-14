// const url ='https://raw.githubusercontent.com/matnasama/proyecto-coderhouse/main/data/productos.json';
const file ='../data/tramites.json';
const containerTramites = document.getElementById('container-tramites');
const modal = document.getElementById('ventana-modal');
const modalForm = document.getElementById('ventana-form');
// const totalCarrito = document.getElementById('total');
const btnClose = document.getElementsByClassName('close')[0];
const btnCloseForm = document.getElementsByClassName('close-form')[0];
// const containerCart = document.querySelector('.modal-body');
const iconMenu = document.getElementById('icon-menu');
const myForm = document.getElementById('myForm');
const myNav = document.getElementById('myTopnav');
const btnFinalizar = document.querySelector('#finalizar-compra');
const btnVaciar = document.querySelector('#vaciar-carrito');
// const cantidadProductos = document.querySelector('.contador-productos');
// const contenedorProductos = document.querySelector('.contenedor-carrito');


let tramitesAlumnos = [];
const alumnos = [];

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});

class Tramite {
    constructor(imagen, nombre, descripcion, id, url) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.id = id;
        this.url = url;
    }

}

cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', mostrarMenu);

    document.addEventListener('DOMContentLoaded', () => {
        renderizarTramites();
        cargarTramiteLocalStorage();
    });

    containerTramites.addEventListener('click', agregarTramite);
    btnFinalizar.addEventListener('click', finalizarTramite);

    btnClose.onclick = function () {
        modal.style.display = 'none';

    };

    window.onclick = function (event) {
        if (event.target == modal || event.target == modalForm) {
            modal.style.display = 'none';
            modalForm.style.display = 'none';

        }
    };

    myForm.onclick = function () {
        modalForm.style.display = 'block';
    };
    
    btnCloseForm.onclick = function () {
        modalForm.style.display = 'none';
    };

}
function cargarTramiteLocalStorage() {
    tramitesAlumnos = JSON.parse(localStorage.getItem('tramitesLS')) || [];
}


function alertTramite(icono, titulo, colorFondo) {
    Toast.fire({
        icon: icono, 
        title: titulo, 
        background: colorFondo, 
    });
}

function leerDatosTramite(tramite) {
   
    const datosTramite = new Tramite(
        tramite.querySelector('img').src,
        tramite.querySelector('h4').textContent,
        Number(tramite.querySelector('p').textContent.replace('$', '')),
        parseInt(tramite.querySelector('a').getAttribute('id'))
    );
}

/* function agregarAlCarrito(productoAgregar) {
    const existeEnCarrito = tramitesAlumnos.some((producto) => producto.id === tramitesAgregar.id);
    if (existeEnCarrito) {
        const productos = tramitesAlumnos.map((producto) => {
        if (producto.id === productoAgregar.id) {
            producto.cantidad++;
            producto.subtotal = producto.precio * producto.cantidad;              
            return producto;
        } else {
                return producto;
            }
    });
        productosCarrito = productos; 
    } else {
        productosCarrito.push(productoAgregar);
    }
    guardarProductosLocalStorage();
    mostrarProductosCarrito();
} */

/* function mostrarProductosCarrito() {
    limpiarHTML();
    productosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;
        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
			<img src="${imagen}" class="img-cart" width="100">
			<P>${nombre}</P>
			<P>$${precio}</P>
			<P>${cantidad}</P>
			<P>$${subtotal}</P>
			<a href="#" class="eliminar-producto" id="${id}"> X </a>
		`;
        containerCart.appendChild(div);
    });
    mostrarCantidadProductos();
    calcularTotal();
} */

/* function calcularTotal() {
    let total = productosCarrito.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0);
    totalCarrito.innerHTML = `Total a Pagar: $${total}`;
} */

function limpiarHTML() {
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
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

async function renderizarProductos() {
    // const tramites = await realizarPeticion(url);
    const tramites = await realizarPeticion(file);
    recorrerArray(tramites);
}

function recorrerArray(arregloTramites) {
    arregloTramites.forEach((tramite) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
			<img src="./img/${tramite.img}" alt="${producto.nombre}" />
			<h4>${tramite.nombre}</h4>
			<p>$${tramite.descripcion}</p>
            <p>$${tramite.url}</p>
			<a id=${tramite.id} class="boton agregar-carrito" href="#">Agregar</a>

        `;
        containerTramites.appendChild(divCard);
    });
}

function mostrarMenu() {
    let navbar = document.getElementById('myTopnav');
    navbar.className = navbar.className === 'topnav' ? (navbar.className += ' responsive') : (navbar.className = 'topnav');
}

const inputFiltar = document.querySelector('#myInput');
const btnFiltro = document.querySelector('#filtro');

btnFiltro.addEventListener('click', myFunction);

async function myFunction() {
    const tramites = await realizarPeticion(file);
    let tramitesFiltrados, filtro;
    filtro = inputFiltar.value.toLowerCase();
    tramitesFiltrados = tramites.filter((tramites) => tramites.nombre.toLowerCase().includes(filtro));

    if (tramitesFiltrados.length > 0) {
        limpiarContenedorTramites();
        recorrerArray(tramitesFiltrados);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Filtrando productos',
            text: '¡No se encontraron productos con el filtro especificado!',
            timerProgressBar: true,
            timer: 10000,
        });
        limpiarContenedorTramites();
        recorrerArray(tramites);
    }
}

function limpiarContenedorTramites() {
    while (containerTramites.firstChild) {
        containerTramites.removeChild(containerTramites.firstChild);
    }
}

modalForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('fname').value;
    const apellido = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const alumno = {};
    alumno.nombre = nombre;
    alumno.apellido = apellido;
    alumno.email = email;
    alumno.nombre = nombre.toUpperCase();
    alumno.apellido = apellido.toUpperCase();
    alumnos.push(alumno);
    localStorage.setItem('alumnoLS', JSON.stringify(alumno));
    modalForm.reset();
    mostrarNombre();

})

function mostrarNombre() {
    clientes.forEach((alumno) => {
        const userName = document.createElement('a');
        userName.classList.add('name');
        userName.innerHTML += `
			Hola ${alumno.nombre}!
        `;
        myNav.appendChild(userName);
        modalForm.style.display = 'none';
    });
}

/* function finalizarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Has finalizado tu compra!',
        timerProgressBar: true,
        timer: 3000,
    });

    eliminarCarritoLS();
    cargarCarritoLocalStorage();
    mostrarProductosCarrito();
    modal.style.display = 'none';
} */
/* 
function vaciarCarrito() {

    Swal.fire({
        title: 'Vaciar carrito',
        text: '¿Confirma que desea vaciar el carrito de compras?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((btnResponse) => {
        if (btnResponse.isConfirmed) {
            Swal.fire({
                title: 'Vaciando Carrito',
                icon: 'success',
                text: 'Su carrito de compras fue vaciado con exito.',
                timerProgressBar: true,
                timer: 3000,
            });
            eliminarCarritoLS();
            cargarCarritoLocalStorage();
            mostrarProductosCarrito();
            modal.style.display = 'none';
    } else {
            Swal.fire({
                title: 'Operación cancelada',
                icon: 'info',
                text: 'La operación de vaciar el carrito de compras fue cancelada',
                timerProgressBar: true,
                timer: 3000,
            });
        }
    });
} */

function eliminarTramiteLS() {
    localStorage.removeItem('tramiteLS');
}

/* function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {

        const productoId = parseInt(e.target.getAttribute('id'));

        alertProducto('error', 'producto eliminado', '#ac0174');
        productosCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
        guardarProductosLocalStorage();
        mostrarProductosCarrito();
    }
} */

/* function mostrarCantidadProductos() {
    let contarProductos;

    if (productosCarrito.length > 0) {
        contenedorProductos.style.display = 'flex';
        contenedorProductos.style.alignItems = 'center';
        cantidadProductos.style.display = 'flex';
        contarProductos = productosCarrito.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
        cantidadProductos.innerText = `${contarProductos}`;
    } else {
        contenedorProductos.style.display = 'block';
        cantidadProductos.style.display = 'none';
    }
} */

