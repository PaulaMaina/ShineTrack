//Retrieves the login token from localStorage
const token = localStorage.getItem('token');

async function showBusinesses() {
    if (token) {
        try {
            const res = await fetch('http://localhost:3000/api/businesses/mybusinesses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (Array.isArray(data)) {
                const tableBody = document.querySelector('#mybusinesses tbody');
                let counter = 1;

                tableBody.innerHTML = '';

                data.forEach(business => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${counter}</td>
                        <td>${business.bizname}</td>
                        <td>${business.bizLocation}</td>
                        <td>${business.telNumber}</td>
                        <td>${business.openingHours}</td>
                        <td>${business.closingHours}</td>
                        <td>${business.bizDescription}</td>
                    `;

                    tableBody.appendChild(row);
                    counter += 1;
                });
            } else {
                document.getElementById('message').innerText = 'No businesses found. Register one today!';
            }
        } catch (error) {
            document.getElementById('message').innerText = 'An error occurred while fetching your businesses. Please try again';
            console.error('Error:', error);
        }
    } else {
        document.getElementById('message').innerText = 'The user is not authenticated. Please log in.' ;
    }
}

window.onload = showBusinesses;

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
            const res = await fetch('http://localhost:3000/api/businesses/register', {
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
                    window.location.href = '/businesses';
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