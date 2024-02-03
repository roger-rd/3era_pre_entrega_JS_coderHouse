// pedidos.js
let subTotales = {};

export const eliminarProducto = (index, mesaNum) => {
    if (subTotales[mesaNum] && index >= 0 && index < subTotales[mesaNum].detallesPedido.length) {
        subTotales[mesaNum].subTotal -= subTotales[mesaNum].detallesPedido[index].precio;
        subTotales[mesaNum].detallesPedido.splice(index, 1);
        mostrarCuentaConEliminar(mesaNum);

        // Guarda la boleta actualizada en el localStorage
        guardarBoletaEnLocalStorage(mesaNum);

         // Remueve la entrada del localStorage
        //  localStorage.removeItem(`boleta-${mesaNum}`);

          Toastify({
            text: "Producto eliminado de la boleta",
            autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              backgroundColor: "#7305055a"
          }).showToast();
    }
};

export const handleClickEliminar = (index, mesaNum) => {
    eliminarProducto(index, mesaNum);
};

export const mostrarCuentaConEliminar = (mesaNum) => {
    const detallesPedidoContainer = document.getElementById(`detallesPedido-${mesaNum}`);
    
    if (!detallesPedidoContainer) {
        console.error(`Elemento detallesPedido-${mesaNum} no encontrado.`);
        return;
    }
    detallesPedidoContainer.innerHTML = '';

    const ul = document.createElement('ul');
    if (subTotales[mesaNum] && subTotales[mesaNum].detallesPedido) {
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
    }
    detallesPedidoContainer.appendChild(ul);
}

export const agregarPlato = (tipoPlato, id, platos, mesaNum) => {
    const plato = obtenerOpcionPorID(tipoPlato, id, platos);
    if (plato) {
        if (!subTotales[mesaNum]) {
            subTotales[mesaNum] = { subTotal: 0, detallesPedido: [] };
        }
        subTotales[mesaNum].detallesPedido.push({ nombre: plato.nombre, precio: plato.precio });
        subTotales[mesaNum].subTotal += plato.precio;
        mostrarCuentaConEliminar(mesaNum);

        // Guarda la boleta actualizada en el localStorage
        guardarBoletaEnLocalStorage(mesaNum);

        // Añade un SweetAlert de agregación exitosa
        Toastify({
            text: "Producto agregado a la boleta",
            duration: 3000,
            close: true,
            gravity: "top-right",
            position: "right",
            theme: "light",
            backgroundColor: "#10d2304b",
          }).showToast();
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

export const cargarDatosDesdeLocalStorage = (mesaNum) => {
    const boletaGuardada = localStorage.getItem(`boleta-${mesaNum}`);

    if (boletaGuardada) {
        // Convierte la cadena JSON almacenada en el localStorage a un objeto y asigna a subTotales[mesaNum]
        subTotales[mesaNum] = JSON.parse(boletaGuardada);
        // Actualiza la visualización de la boleta en la interfaz
        mostrarCuentaConEliminar(mesaNum);
    } else {
        // Si no hay boleta guardada, muestra un mensaje o realiza alguna acción
        console.log(`No hay boleta guardada para la mesa ${mesaNum}`);
    }
};

export const guardarBoletaEnLocalStorage = (mesaNum) => {
    if (subTotales[mesaNum]) {
        // Convierte el objeto a cadena JSON y guárdalo en el localStorage
        localStorage.setItem(`boleta-${mesaNum}`, JSON.stringify(subTotales[mesaNum]));
    } else {
        // Si no hay boleta, elimina la entrada del localStorage
        localStorage.removeItem(`boleta-${mesaNum}`);
    }
};

// Luego, puedes cargar los datos almacenados del localStorage cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos almacenados para cada mesa
    for (let mesaNum = 1; mesaNum <= 4; mesaNum++) {
        cargarDatosDesdeLocalStorage(mesaNum);
    }
});

