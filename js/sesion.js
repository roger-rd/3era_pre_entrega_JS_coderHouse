// document.addEventListener("DOMContentLoaded", async function () {
//     // Define la variable de usuario con correo y contraseña
//     const garzonesJson = '../data/garzones.json'
//     // let currentUser = {
//     //     email: "test@test.com",
//     //     password: "abc123"
//     // };

//     try{
//         const response = await fetch (garzonesJson);
//         if(!response.ok){
//             throw new Error ('error al cargar el archivo garzones JSON');
//         }
//         const data = await response.json();
//         return data;
//     } catch(error){
//         console.error('error al cargar el archivo garzones JSON:', error);
//         return null
//     }



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
//                 }).then(() => {
//                     // Redirige a la página de pedidos después de hacer clic en OK
//                     window.location.href = 'index_interno.html';
//                 });
//             }, 1000);
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
//         // Verifica si las credenciales ingresadas coinciden con las almacenadas en la variable currentUser
//         return email === currentUser.email && password === currentUser.password;
//     }
// });



document.addEventListener("DOMContentLoaded", async function () {
    const garzonesJson = '../data/garzones.json';

    try {
        const response = await fetch(garzonesJson);
        if (!response.ok) {
            throw new Error('Error al cargar el archivo garzones JSON');
        }
        const usersData = await response.json();

        const users = usersData || [];

        let loginForm = document.querySelector(".my-form");

        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            // Verifica si el usuario está registrado antes de continuar
            if (checkUserRegistration(users, email, password)) {
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
                        window.location.href = 'index_interno.html';
                    });
                }, 1000);
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

    } catch (error) {
        console.error('Error al cargar el archivo garzones JSON:', error);
    }
});

function checkUserRegistration(users, email, password) {
    // Asegúrate de que 'users' sea un array antes de utilizar el método 'some'
    return Array.isArray(users) && users.some(user => user.email === email && user.password === password);
}
