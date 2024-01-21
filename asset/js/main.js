
const jsonURL = '../data/menu.json';

// Función para cargar los datos del archivo JSON
const menuJSON = async () => {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return null;
    }
};


menuJSON().then(platos => {

    if (platos) {

        // Manijador de eventos para el botón "Agregar"
        const agregarPlatoHandler = (event) => {
            const categoria = event.target.getAttribute('data-categoria');
            const id = parseInt(event.target.getAttribute('data-id'));
            agregarPlato(categoria, id);
        };

        // FUNCION PARA MOSTRAR EL MENU
        const mostrarProductos = (categoria) => {
            const cardMenu = document.querySelector('.cardMenu');
            cardMenu.innerHTML = '';

            const productos = platos[categoria];
            productos.forEach(producto => {
                // Crea un elemento de botón para cada producto
                const botonAgregar = document.createElement('button');
                botonAgregar.className = 'btn btn-outline-secondary';
                botonAgregar.textContent = 'Agregar';

                // Usa data-* attributes para almacenar información adicional
                botonAgregar.setAttribute('data-categoria', categoria);
                botonAgregar.setAttribute('data-id', producto.id);

                // Asigna un manejador de eventos al botón
                botonAgregar.addEventListener('click', agregarPlatoHandler);

                // Agrega el botón al DOM junto con la información del producto
                cardMenu.appendChild(document.createElement('p')).textContent = `${producto.nombre}: $${producto.precio.toFixed(2)}`;
                cardMenu.appendChild(botonAgregar);
            });
        };

        // Event listener para mostrar productos
        document.getElementById('entrada').addEventListener('click', () => mostrarProductos('entrada'));
        document.getElementById('principal').addEventListener('click', () => mostrarProductos('principal'));
        document.getElementById('bebidas').addEventListener('click', () => mostrarProductos('bebida'));
        document.getElementById('postre').addEventListener('click', () => mostrarProductos('postre'));

        // PARTE REALIZAR EL PEDIDO
        let subTotal = 0;
        let detallesPedido = [];

        function eliminarProducto(index) {
            // Verifica si el índice está dentro del rango válido
            if (index >= 0 && index < detallesPedido.length) {
                // Resta el precio del producto eliminado al subtotal
                subTotal -= detallesPedido[index].precio;
                // Elimina el producto del array de detalles del pedido
                detallesPedido.splice(index, 1);
                // Actualiza la visualización de los detalles del pedido
                mostrarCuentaConEliminar();
            }
        }

       // Función para manejar el clic en el botón de eliminar
       function handleClickEliminar(index) {
        eliminarProducto(index);
    }

// Función para mostrar los detalles del pedido con botones de eliminación
const mostrarCuentaConEliminar = () => {
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

        // Actualizamos la función a la versión con eliminación de productos
        const mostrarCuenta = mostrarCuentaConEliminar;

        const agregarPlato = (tipoPlato, id) => {
            const plato = obtenerOpcionPorID(tipoPlato, id);
            if (plato) {
                detallesPedido.push({ nombre: plato.nombre, precio: plato.precio });
                subTotal += plato.precio;
                mostrarCuenta();
            }
        };

        const obtenerOpcionPorID = (tipoPlato, id) => {
            // Verifica si la categoría existe en el objeto platos
            if (platos.hasOwnProperty(tipoPlato)) {
                // Busca la opción con el ID proporcionado en la categoría
                const opcion = platos[tipoPlato].find((plato) => plato.id === id);

                // Retorna la opción si se encontró, de lo contrario, retorna null
                return opcion || null;
            } else {
                console.error(`La categoría "${tipoPlato}" no existe en el menú.`);
                return null;
            }
        };
    }
});
