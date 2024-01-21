// main.js
import { cargarMenu } from './menu.js';
import { agregarPlato } from './pedidos.js';

document.addEventListener('DOMContentLoaded', () => {
    const mesasContainer = document.getElementById('mesas');

    // Crear mesas (puedes ajustar la cantidad de mesas según sea necesario)
    for (let mesaNum = 1; mesaNum <= 4; mesaNum++) {
        const mesaContainer = document.createElement('div');
        mesaContainer.className = 'mesa-container';
        mesaContainer.innerHTML = `
            <div class="card text-center">
                <div class="card-header">
                    <h4 class="mesa">Mesa ${mesaNum}</h4>
                    <ul class="nav nav-underline justify-content-center link-dark">
                        <li class="nav-item" data-categoria="entrada">
                            <a class="nav-link link-dark" >Entradas</a>
                        </li>
                        <li class="nav-item" data-categoria="principal">
                            <a class="nav-link link-dark" >Principal</a>
                        </li>
                        <li class="nav-item" data-categoria="bebida">
                            <a class="nav-link link-dark" >Bebidas</a>
                        </li>
                        <li class="nav-item" data-categoria="postre">
                            <a class="nav-link link-dark" >Postre</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body text-body-secondary cardMenu">
                </div>
            </div>

            <article class="card boleta">
                <div class="card-header">
                    <h2>Boleta</h2>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush justify-content-center">
                        <li class="list-group-item" id="detallesPedido-${mesaNum}"></li>
                    </ul>
                </div>
            </article>
        `;

        // Agregar la mesa al contenedor principal
        mesasContainer.appendChild(mesaContainer);

        // Obtener los botones de cada mesa
        const entradaBtn = mesaContainer.querySelector('[data-categoria="entrada"]');
        const principalBtn = mesaContainer.querySelector('[data-categoria="principal"]');
        const bebidasBtn = mesaContainer.querySelector('[data-categoria="bebida"]');
        const postreBtn = mesaContainer.querySelector('[data-categoria="postre"]');

        entradaBtn.addEventListener('click', () => mostrarProductos('entrada', mesaNum));
        principalBtn.addEventListener('click', () => mostrarProductos('principal', mesaNum));
        bebidasBtn.addEventListener('click', () => mostrarProductos('bebida', mesaNum));
        postreBtn.addEventListener('click', () => mostrarProductos('postre', mesaNum));
    }

    const mostrarProductos = (categoria, mesaNum) => {
        const cardMenu = document.querySelector(`.mesa-container:nth-child(${mesaNum}) .cardMenu`);
        cardMenu.innerHTML = '';

        cargarMenu().then(platos => {
            if (platos) {
                const agregarPlatoHandler = (event) => {
                    const id = parseInt(event.target.getAttribute('data-id'));
                    agregarPlato(categoria, id, platos, mesaNum);
                };

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
            }
        });
    };
});
