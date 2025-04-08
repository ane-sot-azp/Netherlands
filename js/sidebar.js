document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.querySelector('.main-menu');
    const body = document.body;

    // Función para manejar la expansión del sidebar
    function handleSidebarExpansion() {
        mainMenu.addEventListener('mouseenter', () => {
            body.classList.add('nav-expanded');
            mainMenu.classList.add('expanded');
        });

        mainMenu.addEventListener('mouseleave', () => {
            body.classList.remove('nav-expanded');
            mainMenu.classList.remove('expanded');
        });
    }

    handleSidebarExpansion();
});