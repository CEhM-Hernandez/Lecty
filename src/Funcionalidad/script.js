$(document).ready(function () {

    // ------------- iconos barra de navegación funcional ------------- //

    $('#nav-tab-1').click(function () {
        $('#regular-bookmark').toggleClass('fade');
        $('#solid-bookmark').toggleClass('fade');
    });
    $('#nav-tab-2').click(function () {
        $('#regular-heart').toggleClass('fade');
        $('#solid-heart').toggleClass('fade');
    });
    $('#nav-tab-3').click(function () {
        $('#regular-comment').toggleClass('fade');
        $('#solid-comment').toggleClass('fade');
    });
    $('#nav-tab-4').click(function () {
        $('#solid-gears').toggleClass('fade');
        $('#solid-gear').toggleClass('fade');
    });

    // ------------- cambio de fuente ------------- //

    $('#fuente').on('change', function () {
        const FUENTES_DISPONIBLES = 'roboto-regular comic-neue-regular oswald-regular';
        $('#paginaLibro').removeClass(FUENTES_DISPONIBLES).addClass($('#fuente').val());
    });

    // ------------- cambio de color fuente ------------- //

    $('#colorFuente').on('change', function () {
        $('.tab-pane').css('color', $('#colorFuente').val());
        $('#iconoFuente').css('color', $('#colorFuente').val());
    });

    // ------------- cambio de color fondo ------------- //

    $('#colorFondo').on('change', function () {
        $('.tab-pane').css('background-color', $('#colorFondo').val());
        $('#iconoFuente').css('background-color', $('#colorFondo').val());
    });

    // ------------- comentarios ------------- //

    const colapseComents = $('#collapseComments');
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];

    comentariosGuardados.forEach(comentario => {
        const contenedor = `<div class="comentario card mt-4 text-start p-2">
                                    <div class="card-header d-flex flex-row align-items-center gap-3">
                                        <h5 class="m-0">@${comentario.user}</h5>
                                        <span class="lead" style="font-size: .8rem" id="${comentario.id}">${comentario.tiempo}</span>
                                    </div>
                                    <p class="pt-2">${comentario.text}</p>
                                </div>`;
        colapseComents.append(contenedor);
    });

    // Actualizar tiempos de los comentarios ya cargados
    actualizarTiempos(comentariosGuardados);

    $('#comentar').on('click', function () {
        if ($('#textarea').val() != '') {
            let id = 'tiempo' + parseInt(Math.random() * 1000000000);
            let colapseComents = $('#collapseComments');
            const user = getUser().username;

            let contenedor = `<div class="comentario card mt-4 text-start p-2">
                                <div class="card-header d-flex flex-row align-items-center gap-3">
                                    <h5 class="m-0">@${user}</h5>
                                    <span class="lead" style="font-size: .8rem" id="${id}">${user.tiempo}</span>
                                </div>
                                <p class="pt-2">${$('#textarea').val()}</p>
                            </div>`;

            colapseComents.append(contenedor);

            const fechaComentario = new Date();
            const comentario = {
                id: id,
                user: user,
                text: $('#textarea').val(),
                fecha: fechaComentario,
                tiempo: 'justo ahora'
            };

            // Guardar comentario en localStorage
            let comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentariosGuardados.push(comentario);
            localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

            $('#textarea').val('');

            actualizarTiempos([comentario]);
        } else {
            alert('no puedes hacer un comentario vacío');
        }
    });

    function actualizarTiempos(comentarios) {
        comentarios.forEach(comentario => {
            const fechaComentario = new Date(comentario.fecha);
            setInterval(() => {
                let fechaActual = new Date();
                let diferenciaTiempo = fechaActual.getTime() - fechaComentario.getTime();
                if (diferenciaTiempo < 100) {
                    $('#' + comentario.id).text(`justo ahora`);
                } else if (diferenciaTiempo < 60000) {
                    $('#' + comentario.id).text(`hace ${parseInt(diferenciaTiempo / 1000)} segundos`);
                } else if (diferenciaTiempo < 3600000) {
                    $('#' + comentario.id).text(`hace ${parseInt(diferenciaTiempo / 60000)} minutos`);
                } else if (diferenciaTiempo < 86400000) {
                    $('#' + comentario.id).text(`hace ${parseInt(diferenciaTiempo / 3600000)} horas`);
                } else {
                    $('#' + comentario.id).text(`hace ${parseInt(diferenciaTiempo / 86400000)} días`);
                }
            }, 10000);
        });
    }
});