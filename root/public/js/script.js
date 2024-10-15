document.addEventListener('DOMContentLoaded', function() {
    const popOverlay = document.getElementById('popOverlay');
    const closePopup = document.getElementById('closePopup');

    function openPopup () {
        popOverlay.style.display = 'block';
    }

    function closePopupFunc () {
        popOverlay.style.display = 'none';
    }

    function bizRegistered () {
        console.log("Your carwash has been registered successfullly!");
        closePopup();
    }

    document.querySelector('.add-new button').addEventListener('click', openPopup);

    closePopup.addEventListener('click', closePopupFunc);

    popOverlay.addEventListener('click', function(event) {
        if (event.target === popOverlay) {
            closePopupFunc();
        }
    });
});