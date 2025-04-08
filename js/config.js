// Definición de temas predefinidos
const predefinedThemes = {
    ocean: {
        background: '#E3F2FD',
        text: '#1A237E',
        sidebar_background: '#1E88E5',
        sidebar_text: '#E8EAF6',
        sidebar_hover: '#0D47A1',
        sidebar_hover_text: '#E8F5E9',
        button_background: '#2962FF',
        button_text: '#FFFFFF'
    },
    sun: {
        background: '#FFF8E1',
        text: '#E65100',
        sidebar_background: '#FFB300',
        sidebar_text: '#3E2723',
        sidebar_hover: '#FF8F00',
        sidebar_hover_text: '#FFF3E0',
        button_background: '#FFA000',
        button_text: '#FFFFFF'
    },
    forest: {
        background: '#E8F5E9',
        text: '#1B5E20',
        sidebar_background: '#2E7D32',
        sidebar_text: '#F1F8E9',
        sidebar_hover: '#1B5E20',
        sidebar_hover_text: '#FFFFFF',
        button_background: '#388E3C',
        button_text: '#F1F8E9'
    },
    spring: {
        background: '#FCE4EC',
        text: '#880E4F',
        sidebar_background: '#D81B60',
        sidebar_text: '#FFFFFF',
        sidebar_hover: '#AD1457',
        sidebar_hover_text: '#FCE4EC',
        button_background: '#C2185B',
        button_text: '#FFFFFF'
    },
    mystic: {
        background: '#F3E5F5',
        text: '#4A148C',
        sidebar_background: '#8E24AA',
        sidebar_text: '#F3E5F5',
        sidebar_hover: '#6A1B9A',
        sidebar_hover_text: '#FFFFFF',
        button_background: '#7B1FA2',
        button_text: '#F3E5F5'
    },
    sunset: {
        background: '#FBE9E7',
        text: '#BF360C',
        sidebar_background: '#F4511E',
        sidebar_text: '#FFFFFF',
        sidebar_hover: '#D84315',
        sidebar_hover_text: '#FBE9E7',
        button_background: '#E64A19',
        button_text: '#FFFFFF'
    },
    ruby: {
        background: '#FFEBEE',
        text: '#B71C1C',
        sidebar_background: '#D32F2F',
        sidebar_text: '#FFFFFF',
        sidebar_hover: '#C62828',
        sidebar_hover_text: '#FFEBEE',
        button_background: '#C62828',
        button_text: '#FFFFFF'
    },
    tropical: {
        background: '#E0F7FA',
        text: '#006064',
        sidebar_background: '#00ACC1',
        sidebar_text: '#E0F7FA',
        sidebar_hover: '#00838F',
        sidebar_hover_text: '#FFFFFF',
        button_background: '#0097A7',
        button_text: '#FFFFFF'
    },
    rainbow: {
        background: '#fffafd',               // Fondo general muy suave, casi blanco rosado
        text: '#6e6e6e',                     // Gris medio suave, más pastel que el negro puro
        sidebar_background: '#fcd5ce',       // Rosa melocotón pastel
        sidebar_text: '#856c68',            // Marrón claro pastel para contraste suave
        sidebar_hover: '#f9dcc4',           // Amarillo claro pastel
        sidebar_hover_text: '#7a6a5f',      // Marrón suave para hover
        button_background: '#d0ebff',        // Azul cielo pastel
        button_text: '#4d4d4d'              // Gris medio para buen contraste
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Cargar la configuración actual
    fetch('config.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const colors = data.getElementsByTagName('colors')[0];
            document.getElementById('background').value = colors.getElementsByTagName('background')[0].textContent;
            document.getElementById('text').value = colors.getElementsByTagName('text')[0].textContent;
            document.getElementById('sidebar_background').value = colors.getElementsByTagName('sidebar_background')[0].textContent;
            document.getElementById('sidebar_text').value = colors.getElementsByTagName('sidebar_text')[0].textContent;
            document.getElementById('sidebar_hover').value = colors.getElementsByTagName('sidebar_hover')[0].textContent;
            document.getElementById('sidebar_hover_text').value = colors.getElementsByTagName('sidebar_hover_text')[0].textContent;
            document.getElementById('button_background').value = colors.getElementsByTagName('button_background')[0].textContent;
            document.getElementById('button_text').value = colors.getElementsByTagName('button_text')[0].textContent;

            // Aplicar colores iniciales
            applyColors();
        })
        .catch(error => console.error('Error al cargar la configuración:', error));

    // Aplicar colores en tiempo real al cambiar los inputs
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('input', applyColors);
    });

    // Manejar la selección de temas predefinidos
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.dataset.theme;
            const colors = predefinedThemes[theme];
            
            // Actualizar los valores de los inputs
            for (const [key, value] of Object.entries(colors)) {
                document.getElementById(key).value = value;
            }
            
            // Aplicar los colores
            applyColors();

            // Efecto visual de selección
            themeButtons.forEach(btn => btn.style.transform = '');
            this.style.transform = 'scale(0.95)';
        });

        // Efectos hover
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });

    // Manejar el envío del formulario
    document.getElementById('colorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            background: document.getElementById('background').value,
            text: document.getElementById('text').value,
            sidebar_background: document.getElementById('sidebar_background').value,
            sidebar_text: document.getElementById('sidebar_text').value,
            sidebar_hover: document.getElementById('sidebar_hover').value,
            sidebar_hover_text: document.getElementById('sidebar_hover_text').value,
            button_background: document.getElementById('button_background').value,
            button_text: document.getElementById('button_text').value
        };

        fetch('process_config.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Configuración guardada correctamente');
            } else {
                alert('Error al guardar la configuración: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar la configuración');
        });
    });
});

function applyColors() {
    const root = document.documentElement;
    const style = document.createElement('style');
    
    style.textContent = `
        body {
            background: ${document.getElementById('background').value} !important;
            color: ${document.getElementById('text').value} !important;
        }
        .main-menu {
            background: ${document.getElementById('sidebar_background').value} !important;
        }
        .main-menu li > a {
            color: ${document.getElementById('sidebar_text').value} !important;
        }
        .main-menu li:hover > a, .main-menu li.active > a {
            background-color: ${document.getElementById('sidebar_hover').value} !important;
            color: ${document.getElementById('sidebar_hover_text').value} !important;
        }
        .login-btn, button[type="submit"] {
            background: ${document.getElementById('button_background').value} !important;
            color: ${document.getElementById('button_text').value} !important;
        }
    `;

    // Eliminar estilos anteriores si existen
    const oldStyle = document.getElementById('dynamic-colors');
    if (oldStyle) {
        oldStyle.remove();
    }

    style.id = 'dynamic-colors';
    document.head.appendChild(style);
}