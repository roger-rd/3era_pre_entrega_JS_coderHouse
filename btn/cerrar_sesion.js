// btnOutSesion.js
export function outSesion() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar la sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, elimina el estado de inicio de sesión del localStorage
            localStorage.removeItem("loggedIn");

            // Redirige a la página de inicio de sesión
            window.location.href = "index.html";
        }
    });
}
