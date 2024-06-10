$(document).ready(function() {
    $('#login-button').click(function() {
        const username = $('#login-username').val();
        const password = $('#login-password').val();
        const rememberMe = $('#remember-me').is(':checked');

        const success = login(username, password, rememberMe);
        if (success) {
            console.log("hola")
            window.location.href = '/../src/formularioPago/index.html';
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }
    });

    $('#signup-button').click(function() {
        const username = $('#signup-username').val();
        const password = $('#signup-password').val();
        const success = signup(username, password);
        if (success) {
            alert('Registro exitoso. Ahora puede iniciar sesión.');
        } else {
            alert('Nombre de usuario ya existe.');
        }
    });

    if (checkSession()) {
        window.location.href = '/../src/formularioPago/index.html';
    }
});
