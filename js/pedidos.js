// pedidos.js
let subTotales = {};

export const eliminarProducto = (index, mesaNum) => {
    if (subTotales[mesaNum] && index >= 0 && index < subTotales[mesaNum].detallesPedido.length) {
        subTotales[mesaNum].subTotal -= subTotales[mesaNum].detallesPedido[index].precio;
        subTotales[mesaNum].detallesPedido.splice(index, 1);
        mostrarCuentaConEliminar(mesaNum);
    }
};

export const handleClickEliminar = (index, mesaNum) => {
    eliminarProducto(index, mesaNum);
};

export const mostrarCuentaConEliminar = (mesaNum) => {
    const detallesPedidoContainer = document.getElementById(`detallesPedido-${mesaNum}`);
    detallesPedidoContainer.innerHTML = '';

    const ul = document.createElement('ul');
    subTotales[mesaNum].detallesPedido.forEach((plato, index) => {
        const li = document.createElement('li');
        li.textContent = `${plato.nombre}: $${plato.precio.toFixed(2)}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.className = 'btn btn-outline-danger btn-sm';
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => handleClickEliminar(index, mesaNum));

        li.appendChild(eliminarBtn);
        ul.appendChild(li);
    });

    const total = subTotales[mesaNum].subTotal.toFixed(2);
    const totalLi = document.createElement('li');
    totalLi.textContent = `Total: $${total}`;
    ul.appendChild(totalLi);

    detallesPedidoContainer.appendChild(ul);
};

export const agregarPlato = (tipoPlato, id, platos, mesaNum) => {
    const plato = obtenerOpcionPorID(tipoPlato, id, platos);
    if (plato) {
        if (!subTotales[mesaNum]) {
            subTotales[mesaNum] = { subTotal: 0, detallesPedido: [] };
        }

        subTotales[mesaNum].detallesPedido.push({ nombre: plato.nombre, precio: plato.precio });
        subTotales[mesaNum].subTotal += plato.precio;
        mostrarCuentaConEliminar(mesaNum);
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
