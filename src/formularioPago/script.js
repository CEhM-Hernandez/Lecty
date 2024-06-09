$(() => {
    $('#numeroTarjeta').on('input', function () {

        let input = $(this);
        let logoBanco = $('#logoBanco');

        let value = input.val().replace(/\s+/g, '');

        if (!/^\d*$/.test(value)) {
            input.val(input.val().replace(/[^\d\s]/g, ''));
            return;
        }

        input.val(value.replace(/(\d{4})(?=\d)/g, '$1 '));

        switch (value.charAt(0)) {
            case '3':
                actualizarNumeroTarjeta('fa-cc-amex', input.val())
                break;
            case '4':
                actualizarNumeroTarjeta('fa-cc-visa', input.val())
                break;
            case '5':
                actualizarNumeroTarjeta('fa-cc-mastercard', input.val())
                break;
            case '7':
                actualizarNumeroTarjeta('fa-cc-diners-club', input.val())
                break;
            default:
                actualizarNumeroTarjeta('', '0000 0000 0000 0000')
                break;
        }

        function actualizarNumeroTarjeta(addClass, nuevoNumero) {
            logoBanco.removeClass('fa-cc-visa fa-cc-amex fa-cc-diners-club fa-cc-mastercard').addClass(addClass);
            let esValido = input.val().length === 19 && addClass != '';
            actualizarEstado($('#numeroTarjeta'), esValido, $('#numeroTarjetaDinamica'), nuevoNumero);
        }
    });

    $('#nombre').on('input', function () {
        let input = $(this);
        let value = input.val();
        let nombre = $('#nombreTarjetaDinamica');

        let validValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]/g, '');

        if (value !== validValue) {
            input.val(validValue);
        }

        nombre.text(validValue.toUpperCase());

        input.removeClass('is-invalid').addClass('is-valid');

        if (validValue.length <= 0) {
            input.removeClass('is-valid').addClass('is-invalid');
            nombre.text('NOMBRE EN LA TARJETA');
        }
    });

    $('#cvv').on('input', function () {
        let input = $(this);
        let value = input.val();
        let cvv = $('#cvvTarjetaDinamica');

        let validValue = value.replace(/[^\d]/g, '');

        if (value !== validValue) {
            input.val(validValue);
        }

        cvv.text(validValue);

        if (validValue.length <= 0) {
            cvv.text('123');
            input.removeClass('is-valid').addClass('is-invalid');
        } else {
            input.removeClass('is-invalid').addClass('is-valid');
        }
    });



    function validarFechaYEntrada() {
        let MM = $('#expiracionMM').val();
        let YY = $('#expiracionYY').val();

        let esMesValido = MM.length === 2 && MM >= 1 && MM <= 12;
        let esAnoValido = YY.length === 2 && YY >= 24 && YY <= 99;

        if (esMesValido && esAnoValido) {
            let fechaActual = new Date();
            let mesActual = fechaActual.getMonth() + 1;
            let añoActual = fechaActual.getFullYear();

            let fechaIngresada = new Date(`20${YY}`, MM);

            let esFechaValida = fechaIngresada.getFullYear() > añoActual ||
                (fechaIngresada.getFullYear() === añoActual && fechaIngresada.getMonth() > mesActual);

            actualizarEstado($('#expiracionMM'), esFechaValida, $('#mes'), MM);
            actualizarEstado($('#expiracionYY'), esFechaValida, $('#ano'), YY);
        } else {
            actualizarEstado($('#expiracionMM'), esMesValido, $('#mes'), 'MM');
            actualizarEstado($('#expiracionYY'), esAnoValido, $('#ano'), 'YY');
        }
    }

    $('#expiracionMM').on('input', function () {
        let input = $(this);
        let value = input.val().replace(/[^\d]/g, '');
        input.val(value);
        validarFechaYEntrada();
    });

    $('#expiracionYY').on('input', function () {
        let input = $(this);
        let value = input.val().replace(/[^\d]/g, '');
        input.val(value);
        validarFechaYEntrada();
    });

    $('#cantidadMeses').on('input', function () {
        let input = $('#cantidadMeses');
        let value = $('#cantidadMeses').val();

        setPrecio();

        if (value.length <= 0) {
            input.removeClass('is-valid').addClass('is-invalid');
        } else {
            input.removeClass('is-invalid').addClass('is-valid');
        }
    });

    $('#free').on('click', function () {
        setPrecio();
    });

    $('#basico').on('click', function () {
        setPrecio();
    });

    $('#pro').on('click', function () {
        setPrecio();
    });

    function setPrecio() {
        let value = $('#cantidadMeses').val();
        let total = $('#precioTotal');

        total.val('$' + new Intl.NumberFormat().format(precio()));

        function precio() {
            if ($('#free').hasClass('active')) {
                return 0;
            } else if ($('#basico').hasClass('active')) {
                return 25000 * parseInt(value);
            } else if ($('#pro').hasClass('active')) {
                return 45000 * parseInt(value);
            }
        }
    }

    function actualizarEstado(input, esValido, elementoDinamico, valor) {
        if (esValido) {
            input.removeClass('is-invalid').addClass('is-valid');
        } else {
            input.removeClass('is-valid').addClass('is-invalid');
        }
        elementoDinamico.text(valor);
    }
});