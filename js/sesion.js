
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector(".my-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Muestra un mensaje de carga con SweetAlert
        Swal.fire({
            title: 'Cargando usuario',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        let email = document.getElementById("email");
        let password = document.getElementById("password");

        console.log("Email:", email.value);
        console.log("Password:", password.value);

        // Simula un retraso para demostrar el efecto de carga
        setTimeout(function () {
            // Cierra el mensaje de carga y muestra un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${email.value}`,
                text: '¡Ingreso exitoso!',
                confirmButtonText: 'OK'
            });
        }, 2000); // Cambia este valor por el tiempo que necesites
    });
});
