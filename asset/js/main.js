// FUNCION PARA MOSTRAR EL MENU
document.getElementById('entrada').addEventListener('click', () => mostrarProductos('entrada'));
document.getElementById('principal').addEventListener('click', () => mostrarProductos('principal'));
document.getElementById('bebidas').addEventListener('click', () => mostrarProductos('bebida'));
document.getElementById('postre').addEventListener('click', () => mostrarProductos('postre'));


const mostrarProductos = (categoria) => {
    const cardMenu = document.querySelector('.cardMenu');
    cardMenu.innerHTML = '';

    const productos = platos[categoria];
    productos.forEach(producto => {
        cardMenu.innerHTML += `<p>${producto.nombre}: $${producto.precio.toFixed(2)}</p>`;
    });
};

//PARTE REALIZAR EL PEDIDO
let subTotal = 0;
let detallesPedido = [];

const mostrarCuenta = () => {
    const detallesPedidoHTML = detallesPedido.map(plato => `<li>${plato.nombre}: $${plato.precio.toFixed(2)}</li>`).join("");
    const total = subTotal.toFixed(2);
    document.getElementById('detallesPedido').innerHTML = `<ul>${detallesPedidoHTML}<li>Total: $${total}</li></ul>`;
};

document.getElementById('entradaBtn').addEventListener('click', () => agregarPlato('entrada'));
document.getElementById('principalBtn').addEventListener('click', () => agregarPlato('principal'));
document.getElementById('bebidaBtn').addEventListener('click', () => agregarPlato('bebida'));
document.getElementById('postreBtn').addEventListener('click', () => agregarPlato('postre'));
document.getElementById('mostrarCuentaBtn').addEventListener('click', mostrarCuenta);


const platos = {
    entrada: [
        { id: 1, nombre: "empanadas", precio: 3.5 },
        { id: 2, nombre: "arepitas", precio: 4.0 },
        { id: 3, nombre: "pan con queso", precio: 2.5 },
        { id: 4, nombre: "facturas", precio: 5.0 },
    ],
    principal: [
        { id: 20, nombre: "pasticho", precio: 9.5 },
        { id: 21, nombre: "ojo de bife", precio: 14.0 },
        { id: 22, nombre: "costillas de cerdo", precio: 2.5 },
        { id: 23, nombre: "sopa", precio: 5.0 },
    ],
    bebida: [
        { id: 30, nombre: "coca cola", precio: 1.5 },
        { id: 31, nombre: "pepsi cola", precio: 1.5 },
        { id: 32, nombre: "jugo natural", precio: 2.0 },
        { id: 33, nombre: "cerveza", precio: 3.0 },
    ],
    postre: [
        { id: 40, nombre: "torta", precio: 1.5 },
        { id: 41, nombre: "quesillo", precio: 1.5 },
        { id: 42, nombre: "helado", precio: 2.0 },
        { id: 33, nombre: "galletas", precio: 3.0 },
    ],
};

const agregarPlato = (tipoPlato) => {
    const plato = obtenerOpcionPorID(tipoPlato);
    if (plato) {
        detallesPedido.push({ nombre: plato.nombre, precio: plato.precio });
        subTotal += plato.precio;
    }
};

const obtenerOpcionPorID = (tipoPlato) => {
    let opcion;
    do {
        opcion = prompt(`Ingrese el número de la opción de ${tipoPlato}:\n${obtenerOpcionesPorID(platos[tipoPlato])}`);
        if (opcion === null) return null;
        if (!esOpcionValidaPorID(opcion, platos[tipoPlato])) {
            alert(`Por favor, ingrese un número de opción de ${tipoPlato} válido.`);
        }
    } while (!esOpcionValidaPorID(opcion, platos[tipoPlato]));
    return platos[tipoPlato].find((plato) => plato.id === parseInt(opcion));
};

const obtenerOpcionesPorID = (listaPlatos) => {
    return listaPlatos.map(({ id, nombre, precio }) => `\n ${id}. ${nombre} .. $${precio.toFixed(2)}`).join("");
};

const esOpcionValidaPorID = (opcion, listaPlatos) => {
    opcion = parseInt(opcion);
    return listaPlatos.some((plato) => plato.id === opcion);
};


