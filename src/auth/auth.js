function signup(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return false;
    }
    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    return true; 
}

function login(username, password, rememberMe) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        const userData = { username: username };
        sessionStorage.setItem('user', JSON.stringify(userData));

        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
        }

        return true; 
    } else {
        return false;
    }
}

function logout() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('currentUser');
}

function checkSession() {
    let userData = null;

    if (sessionStorage.getItem('user')) {
        userData = JSON.parse(sessionStorage.getItem('user'));
    } else if (localStorage.getItem('currentUser')) {
        userData = JSON.parse(localStorage.getItem('currentUser'));

        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    return userData !== null;
}

function getUser() {
    let userData = null;
    if (sessionStorage.getItem('user')) {
        userData = JSON.parse(sessionStorage.getItem('user'));
    } else if (localStorage.getItem('currentUser')) {
        userData = JSON.parse(localStorage.getItem('currentUser'));
    }
    return userData;
}
