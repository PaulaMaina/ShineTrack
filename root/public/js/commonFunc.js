function showPassword() {
    var pwd = document.getElementById('password');
    var confirmPwd = document.getElementById('confirmpwd');

    if (pwd.type === 'password' || confirmPwd.type === 'password') {
        pwd.type = 'text';
        confirmPwd.type = 'text';
    } else {
        pwd.type = 'password';
        confirmPwd.type = 'password';
    }
}

// Log out function
function logout() {
    localStorage.removeItem('token');       // Deletes the authorization token
    window.location.href = '/login';
}