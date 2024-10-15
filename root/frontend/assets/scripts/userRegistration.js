document.getElementById('user-signup').addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const phoneNumber = document.getElementById('phonenumber').value;
    const emailAddress = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Prepares the form data as a JSON object
    const formData = { firstName, lastName, phoneNumber, emailAddress, password };

    try {
        const res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)  //Sends the data from the form as JSON
        });

        const data = await res.json();

        //Checks whether the user registration was successful
        if (res.ok) {
            document.getElementById('signup-message').innerText = 'Account registration has been completed successfully!';
            
            //Redirects to the login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            document.getElementById('signup-message').innerText = data.message;     //Displays the message from the backend
        }
    } catch (error) {
        document.getElementById('signup-message').innerText = 'An error occurred during registration. Please try again';
        console.error('Error:', error);
    }
});