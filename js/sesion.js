
// let garzon = {
//     email: 'test@test.com',
//     password: 'abc123'
// };

// localStorage.setItem('user', JSON.stringify(garzon));

// document.addEventListener("DOMContentLoaded", function () {
//     let loginForm = document.querySelector(".my-form");

//     loginForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         let email = document.getElementById("email").value;
//         let password = document.getElementById("password").value;

//         // Verifica si el usuario está registrado antes de continuar
//         if (checkUserRegistration(email, password)) {
//             // Muestra un mensaje de carga con SweetAlert
//             Swal.fire({
//                 title: 'Cargando usuario',
//                 allowOutsideClick: false,
//                 onBeforeOpen: () => {
//                     Swal.showLoading();
//                 }
//             });

//             // Simula un retraso para demostrar el efecto de carga
//             setTimeout(function () {
//                 // Cierra el mensaje de carga y muestra un mensaje de éxito
//                 Swal.fire({
//                     icon: 'success',
//                     title: `Bienvenido ${email}`,
//                     text: '¡Ingreso exitoso!',
//                     confirmButtonText: 'OK'
//                 });
//             }, 2000); // Cambia este valor por el tiempo que necesites
//         } else {
//             // Muestra un mensaje de error si el usuario no está registrado
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error de inicio de sesión',
//                 text: 'Usuario no registrado o información incorrecta',
//                 confirmButtonText: 'OK'
//             });
//         }
//     });

//     function checkUserRegistration(email, password) {
//         // Obtén los datos del usuario almacenados en el localStorage
//         let storedUserData = JSON.parse(localStorage.getItem('user')) || {};
    
//         // Verifica si las credenciales ingresadas coinciden con las almacenadas
//         return email === storedUserData.email && password === storedUserData.password;
//     }
    
// });


document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.querySelector(".my-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Verifica si el usuario está registrado antes de continuar
        if (checkUserRegistration(email, password)) {
            // Muestra un mensaje de carga con SweetAlert
            Swal.fire({
                title: 'Cargando usuario',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            // Simula un retraso para demostrar el efecto de carga
            setTimeout(function () {
                // Cierra el mensaje de carga y muestra un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: `Bienvenido ${email}`,
                    text: '¡Ingreso exitoso!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirige a la página de pedidos después de hacer clic en OK
                    window.location.href = 'pedidos.html'; // Reemplaza 'pedidos.html' con la ruta correcta
                });
            }, 1000); // Cambia este valor por el tiempo que necesites
        } else {
            // Muestra un mensaje de error si el usuario no está registrado
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Usuario no registrado o información incorrecta',
                confirmButtonText: 'OK'
            });
        }
    });

    function checkUserRegistration(email, password) {
        // Obtén los datos del usuario almacenados en el localStorage
        let storedUserData = JSON.parse(localStorage.getItem('user')) || {};
    
        // Verifica si las credenciales ingresadas coinciden con las almacenadas
        return email === storedUserData.email && password === storedUserData.password;
    }
});



