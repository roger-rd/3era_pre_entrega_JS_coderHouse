// menu.js

// Función para cargar los datos del archivo JSON
export const cargarMenu = async () => {
    const jsonURL = '../data/menu.json';

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
