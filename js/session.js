document.addEventListener('DOMContentLoaded', function() {
    function checkSession() {
        fetch('check_session.php')
            .then(response => response.json())
            .then(data => {
                if (!data.loggedIn) {
                    window.location.href = 'index.html';
                    return;
                }
                
                // Personalizar el contenido
                const userName = data.user.nombre;
                const userAge = data.user.edad;

                // Actualizar elementos de la página
                const welcomeElements = document.querySelectorAll('.welcome-message');
                welcomeElements.forEach(element => {
                    element.textContent = `¡Bienvenido, ${userName}!`;
                });

                // Personalizar contenido según la edad
                const ageSpecificContent = document.querySelectorAll('[data-age-content]');
                ageSpecificContent.forEach(element => {
                    const minAge = parseInt(element.dataset.minAge) || 0;
                    const maxAge = parseInt(element.dataset.maxAge) || 150;
                    
                    if (userAge >= minAge && userAge <= maxAge) {
                        element.style.display = 'block';
                    } else {
                        element.style.display = 'none';
                    }
                });
            })
            .catch(error => {
                console.error('Error checking session:', error);
                window.location.href = 'index.html';
            });
    }

    // Verificar sesión al cargar la página
    checkSession();
});
