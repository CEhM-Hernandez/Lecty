$(() => {
    $('#numeroTarjeta').on('input', function () {

        let input = $(this);
        let dinamicCard = $('#dinamicCard');

        if (input.val().length === 1) {
            switch (input.val()) {
                case "4":
                    console.log("visa");
                    dinamicCard.append('<div>que rico que es el peeeeeeeene</div>');
                    break;
                case "5":
                    console.log("mastercard");
                    break;
                case "3":
                    console.log("american express");
                    break;
                case "7":
                    console.log("dinners club");
                    break;
                default:
                    console.log("ingrese una tarjeta valida");
                    break;
            }
        } else {
            let value = input.val().replace(/\s+/g, '');

            if (!/^\d*$/.test(value)) {
                input.val(input.val().replace(/[^\d\s]/g, ''));
                return;
            }

            input.val(value.replace(/(\d{4})(?=\d)/g, '$1 '));

            if (input.val().length != 19) {
                input.toggleClass("is-valid");
                input.addClass("is-invalid");
            } else if (input.val().length === 19) {
                input.toggleClass("is-invalid");
                input.addClass("is-valid");
            }
        }
    });
});