let currentLanguage = 'es';

function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    currentLanguage = lang;
    updateContent();
    localStorage.setItem('preferredLanguage', lang);
}

function getCurrentLanguage() {
    return currentLanguage;
}

function updateContent() {
    // Actualizar elementos de navegación
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = translations[currentLanguage];
        let found = true;
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                found = false;
                break;
            }
        }
        
        if (!found) {
            translation = element.textContent; // Mantener el texto original si no se encuentra la traducción
        }
        
        if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    });
}

// Inicializar el idioma al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        updateContent(); // Asegurarse de que el contenido se actualice incluso si no hay idioma guardado
    }
    
    // Agregar selector de idioma si no existe
    if (!document.querySelector('.language-selector')) {
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = `
            <button onclick="setLanguage('es')" class="lang-btn" data-lang="es">ES</button>
            <button onclick="setLanguage('en')" class="lang-btn" data-lang="en">EN</button>
        `;
        document.body.appendChild(selector);
    }
});