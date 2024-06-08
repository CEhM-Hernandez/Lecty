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
            logoBanco.removeClass('fa-cc-visa');
            logoBanco.removeClass('fa-cc-amex');
            logoBanco.removeClass('fa-cc-diners-club');
            logoBanco.removeClass('fa-cc-mastercard');
            logoBanco.addClass(addClass);
            numeroTarjeta.text(nuevoNumero);
            if (input.val().length === 19 && addClass != '') {
                input.removeClass('is-invalid');
                input.addClass('is-valid');
            } else {
                input.removeClass('is-valid');
                input.addClass('is-invalid');
            }
        }
    });


});