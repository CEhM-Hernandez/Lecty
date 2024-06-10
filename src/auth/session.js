function handleSession(redirectPathAuthenticated, redirectPathUnauthenticated) {
    $(document).ready(function () {
        if (!checkSession()) {
            window.location.href = redirectPathUnauthenticated;
        } else {
            const user = getUser();
            $('#user-name').text(user.username);
        }
        $('#logout-button').click(function () {
            logout();
            window.location.href = redirectPathUnauthenticated;
        });
    });
}