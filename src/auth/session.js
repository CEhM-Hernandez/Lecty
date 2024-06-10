$(document).ready(function() {
    if (!checkSession()) {
        window.location.href = '/../src/formularioPago/index.html';
    } else {
        const user = getUser();
        $('#user-name').text(user.username);
    }
    $('#logout-button').click(function() {
        logout();
        window.location.href = '/../src/signin/index.html';
    });
});
