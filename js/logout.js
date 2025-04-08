document.addEventListener('DOMContentLoaded', function() {
    const logoutLinks = document.querySelectorAll('.logout a');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Limpiar cualquier dato de sesión almacenado localmente
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirigir a logout.php
            window.location.href = 'logout.php';
        });
    });
});