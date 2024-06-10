$(document).ready(function () {
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
});