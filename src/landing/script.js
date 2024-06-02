$(document).ready(() => {
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        alert('formulario envíado con éxito');
    });

    $("#limpiar").click(function () {
        $("#contact-form")[0].reset();
    });
});
