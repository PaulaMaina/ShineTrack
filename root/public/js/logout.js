// Log out function
function logout() {
    localStorage.removeItem('token');       // Deletes the authorization token
    window.location.href = '/login';
}