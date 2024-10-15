//Retrieves the login token from localStorage
const token = localStorage.getItem('token');

//Makes an authenticated request to register a new business
if (token) {
    document.getElementById('biz-register').addEventListener('submit', async function (e) {
        e.preventDefault();

        const bizname = document.getElementById('bizname').value;
        const bizLocation = document.getElementById('bizLocation').value;
        const telNumber = document.getElementById('telNumber').value;
        const openingHours = document.getElementById('openingHours').value;
        const closingHours = document.getElementById('closingHours').value;
        const bizDescription = document.getElementById('bizDescription').value;

        const formData = {
            bizname,
            bizLocation,
            telNumber,
            openingHours,
            closingHours,
            bizDescription
        };

        try {
            const res = fetch('http://localhost:3000/api/businesses/new-business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            //Checks whether the business registration was successful
            if (res.ok) {
                document.getElementById('register-message').innerText = 'Registration has been completed successfully!';
                
                //Redirects to the businesses page after 3 seconds
                setTimeout(() => {
                    window.location.href = '/root/frontend/business.html';
                }, 3000);
            } else {
                document.getElementById('register-message').innerText = data.message;     //Displays the message from the backend
            }
        } catch (error) {
            document.getElementById('register-message').innerText = 'An error occurred during registration. Please try again';
            console.error('Error:', error);
        }
    });
}