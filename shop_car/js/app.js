// variables
const carrito = document.querySelector('#carrito');
const shopcar = document.querySelector('#lista-carrito tbody');
const cleanshop = document.querySelector('#vaciar-carrito');
const productos = document.querySelector('#lista-productos');
let articulos = [];

registarEventListeners();
function registarEventListeners() {
    // event de click
    productos.addEventListener('click', agregarProducto);

    // eliminar productos
    carrito.addEventListener('click', eliminarProducto);

    // vaciar carrito
    cleanshop.addEventListener('click',() => {
        articulos = []; // se resetea el array
        limpiarHTML();
    });
};

// function para seleccionar el contenido correcto
function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado)
    }
};
// elimina un producto del carrito
function eliminarProducto(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const productoId = e.target.getAttribute('data-id');
        articulos = articulos.filter((producto) => producto.id !== productoId);
        carritoHTML(); // iterar sobre el carrito y mostrar su HTML...
    }
}

// lee el contenido HTML al que dimos click y extrae su informacion
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        nombre : producto.querySelector('h4').textContent,
        precio : producto.querySelector('.precio span').textContent,
        id : producto.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    // revisa si el producto ya existe dentro del carrito de compras
    const existe = articulos.some((producto) => producto.id === infoProducto.id);
    if(existe) {
        const repetido = articulos.map((producto) => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna objetos duplicados
            } else {
                return producto; // retorna objetos no duplicados
            }
        });
        articulos = [...repetido];
    } else {
        // agrega los elementos al array de articulos
        articulos = [...articulos, infoProducto];
    };

    // esta funciona muestra los articulos en el HTML
    carritoHTML();
}

// muestra los articulos en el HTML
function carritoHTML() {

    // limpiar HTML
    limpiarHTML();

    // recorre el carrito y genera el HTML
    articulos.forEach((producto) => {
        const {imagen,nombre,precio,id,cantidad} = producto; // disctrocturing (???
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width=100>
            </td>
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;

        // agrega el HTML al tbody
        shopcar.appendChild(row);
    });
};

// limpia el tbody
function limpiarHTML() {
    ///shopcar.innerHTML = ''; ---- esto casi ya no se usa...
    while(shopcar.firstChild) {
        shopcar.removeChild(shopcar.firstChild)
    }
};