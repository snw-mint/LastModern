// Função para aplicar as classes salvas ao carregar a página
function applySettings() {
    const settings = [
        'hide-loved', 'hide-obsessions', 'hide-events', 'hide-neighbours', 
        'hide-tags', 'hide-shouts', 'hide-followers', 'hide-following', 
        'hide-playlists', 'hide-library'
    ];

    chrome.storage.local.get(settings, (result) => {
        settings.forEach(id => {
            if (result[id]) {
                document.body.classList.add(id);
            } else {
                document.body.classList.remove(id);
            }
        });
    });
}

// Ouve mensagens do Popup para atualização em tempo real
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateVisibility') {
        if (request.value) {
            document.body.classList.add(request.setting);
        } else {
            document.body.classList.remove(request.setting);
        }
    }
});

const header = document.getElementById('toggle-profile-tabs');
    const content = document.getElementById('profile-tabs-content');

    header.addEventListener('click', () => {
        // Alterna a classe 'active' para girar a seta
        header.classList.toggle('active');

        // Animação de altura (Max-Height)
        if (content.style.maxHeight) {
            content.style.maxHeight = null; // Fecha
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Abre
        }
    });

// Executa ao iniciar
applySettings();