$(() => {
    $('#numeroTarjeta').on('input', function () {

        let input = $(this);
        let logoBanco = $('#logoBanco');
        let numeroTarjeta = $('#numeroTarjetaDinamica');

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
            logoBanco.removeClass('fa-cc-visa fa-cc-amex fa-cc-diners-club fa-cc-mastercard');
            logoBanco.addClass(addClass);
            numeroTarjeta.text(nuevoNumero);
            if (input.val().length === 19 && addClass != '') {
                input.removeClass('is-invalid').addClass('is-valid');
            } else {
                input.removeClass('is-valid').addClass('is-invalid');
            }
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

    $('#expiracionMM').on('input', function () {
        let input = $(this);
        let value = $(this).val();
        let mes = $('#mes');

        let validValue = value.replace(/[^\d{12}]/g, '');

        if (value !== validValue) {
            input.val(validValue);
        }

        mes.text(validValue);

        if (validValue.length <= 0 || validValue > 12) {
            mes.text('00');
            input.removeClass('is-valid').addClass('is-invalid');
        } else {
            input.removeClass('is-invalid').addClass('is-valid');
        }
    });

    $('#expiracionYY').on('input', function () {
        let input = $(this);
        let value = $(this).val();
        let ano = $('#ano');

        let validValue = value.replace(/[^\d]/g, '');

        if (value !== validValue) {
            input.val(validValue);
        }

        ano.text(validValue);


        if (validValue.length <= 0 || validValue > 28 || validValue < 25) {
            ano.text('00');
            input.removeClass('is-valid').addClass('is-invalid');
        } else {
            input.removeClass('is-invalid').addClass('is-valid');
        }
    });

    $('#cuotas').on('input', function () {
        let input = $('#cuotas');
        let value = input.val();

        setPrecio();

        if (value.length <= 0 || value > 12) {
            input.removeClass('is-valid').addClass('is-invalid');
        } else {
            input.removeClass('is-invalid').addClass('is-valid');
        }
    });

    $('#free').on('click', function () {
        setPrecio();
        console.log("peeeenee")
    });

    $('#basico').on('click', function () {
        setPrecio();
    });

    $('#pro').on('click', function () {
        setPrecio();
    });

    function setPrecio() {
        let input = $('#cuotas');
        let value = $('#cuotas').val();
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
});