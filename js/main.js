// main.js
import { cargarMenu } from './menu.js';
import { agregarPlato, obtenerOpcionPorID } from './pedidos.js';

document.addEventListener('DOMContentLoaded', () => {
    const entradaBtn = document.getElementById('entrada');
    const principalBtn = document.getElementById('principal');
    const bebidasBtn = document.getElementById('bebidas');
    const postreBtn = document.getElementById('postre');

    cargarMenu().then(platos => {
        if (platos) {
            const agregarPlatoHandler = (event) => {
                const categoria = event.target.getAttribute('data-categoria');
                const id = parseInt(event.target.getAttribute('data-id'));
                agregarPlato(categoria, id, platos);
            };

            const mostrarProductos = (categoria) => {
                const cardMenu = document.querySelector('.cardMenu');
                cardMenu.innerHTML = '';

                const productos = platos[categoria];
                productos.forEach(producto => {
                    const botonAgregar = document.createElement('button');
                    botonAgregar.className = 'btn btn-outline-secondary';
                    botonAgregar.textContent = 'Agregar';

                    botonAgregar.setAttribute('data-categoria', categoria);
                    botonAgregar.setAttribute('data-id', producto.id);

                    botonAgregar.addEventListener('click', agregarPlatoHandler);

                    cardMenu.appendChild(document.createElement('p')).textContent = `${producto.nombre}: $${producto.precio.toFixed(2)}`;
                    cardMenu.appendChild(botonAgregar);
                });
            };

            entradaBtn.addEventListener('click', () => mostrarProductos('entrada'));
            principalBtn.addEventListener('click', () => mostrarProductos('principal'));
            bebidasBtn.addEventListener('click', () => mostrarProductos('bebida'));
            postreBtn.addEventListener('click', () => mostrarProductos('postre'));
        }
    });
});
