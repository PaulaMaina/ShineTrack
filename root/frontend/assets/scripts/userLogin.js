document.getElementById('user-login').addEventListener('submit', async function (e) {
    e.preventDefault();

    const phoneNumber = document.getElementById('phonenumber').value;
    const password = document.getElementById('password').value;

    try {
        //Make a POST request to the login API endpoint
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, password })
        });
        const data = await res.json();

        if (data.token) {
            //Saves the token to localStorage
            localStorage.setItem('token', data.token);
            console.log('The token has been saved to localStorage');
            document.getElementById('login-message').innerText = 'Login successful';
            
            //Redirects to the dashboard page after 3 seconds
            setTimeout(() => {
                window.location.href = '/root/frontend/dashboard.html';
            }, 3000);
        } else {
            console.error('Login attempt failed:', error.message);      //Displays the error from the backend
        }

    } catch (error) {
        console.error('Error:', error);
    }
});