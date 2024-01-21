// pedidos.js

let subTotal = 0;
let detallesPedido = [];

export const eliminarProducto = (index) => {
    // Verifica si el índice está dentro del rango válido
    if (index >= 0 && index < detallesPedido.length) {
        // Resta el precio del producto eliminado al subtotal
        subTotal -= detallesPedido[index].precio;
        // Elimina el producto del array de detalles del pedido
        detallesPedido.splice(index, 1);
        // Actualiza la visualización de los detalles del pedido
        mostrarCuentaConEliminar();
    }
};

// Función para manejar el clic en el botón de eliminar
export const handleClickEliminar = (index) => {
    eliminarProducto(index);
};

// Función para mostrar los detalles del pedido con botones de eliminación
export const mostrarCuentaConEliminar = () => {
    const detallesPedidoContainer = document.getElementById('detallesPedido');
    detallesPedidoContainer.innerHTML = '';

    const ul = document.createElement('ul');
    detallesPedido.forEach((plato, index) => {
        const li = document.createElement('li');
        li.textContent = `${plato.nombre}: $${plato.precio.toFixed(2)}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.className = 'btn btn-outline-danger btn-sm';
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => handleClickEliminar(index));

        li.appendChild(eliminarBtn);
        ul.appendChild(li);
    });

    const total = subTotal.toFixed(2);
    const totalLi = document.createElement('li');
    totalLi.textContent = `Total: $${total}`;
    ul.appendChild(totalLi);

    detallesPedidoContainer.appendChild(ul);
};

// Resto del código de pedidos.js...

export const agregarPlato = (tipoPlato, id, platos) => {
    const plato = obtenerOpcionPorID(tipoPlato, id, platos);
    if (plato) {
        detallesPedido.push({ nombre: plato.nombre, precio: plato.precio });
        subTotal += plato.precio;
        mostrarCuentaConEliminar();
    }
};

export const obtenerOpcionPorID = (tipoPlato, id, platos) => {
    if (platos.hasOwnProperty(tipoPlato)) {
        const opcion = platos[tipoPlato].find((plato) => plato.id === id);
        return opcion || null;
    } else {
        console.error(`La categoría "${tipoPlato}" no existe en el menú.`);
        return null;
    }
};
