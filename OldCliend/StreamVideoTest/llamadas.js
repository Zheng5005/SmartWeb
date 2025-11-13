// Elementos
const micBtn = document.getElementById('micBtn');
const camBtn = document.getElementById('camBtn');
const screenBtn = document.getElementById('screenBtn');
const chatBtn = document.getElementById('chatBtn');
const endBtn = document.getElementById('endBtn');
const chatPanel = document.getElementById('chatPanel');
const participantsPanel = document.getElementById('participantsPanel');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Estados
let micActive = true;
let camActive = true;
let screenActive = false;
let chatActive = false;

// Micrófono
micBtn.addEventListener('click', () => {
    micActive = !micActive;
    micBtn.classList.toggle('active', micActive);
    micBtn.classList.toggle('off', !micActive);
    console.log('Micrófono:', micActive ? 'Activado' : 'Desactivado');
});

// Cámara
camBtn.addEventListener('click', () => {
    camActive = !camActive;
    camBtn.classList.toggle('active', camActive);
    camBtn.classList.toggle('off', !camActive);
    console.log('Cámara:', camActive ? 'Activada' : 'Desactivada');
});

// Compartir pantalla
screenBtn.addEventListener('click', () => {
    screenActive = !screenActive;
    screenBtn.classList.toggle('active', screenActive);
    console.log('Compartir pantalla:', screenActive ? 'Iniciado' : 'Detenido');
});

// Chat
chatBtn.addEventListener('click', () => {
    chatActive = !chatActive;
    chatBtn.classList.toggle('active', chatActive);
    chatPanel.classList.toggle('active', chatActive);
    participantsPanel.classList.toggle('active', !chatActive);
    if (chatActive) {
        setTimeout(() => chatInput.focus(), 100);
    }
});

// Enviar mensaje
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        const messageText = chatInput.value;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message own';
        messageDiv.innerHTML = `
                    <div>
                        <div class="message-author">Tú</div>
                        <div class="message-bubble">${messageText}</div>
                    </div>
                `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
    }
});

// Finalizar llamada
endBtn.addEventListener('click', () => {
    if (confirm('¿Finalizar la llamada?')) {
        alert('Llamada finalizada');
        console.log('Llamada finalizada');
    }
});

// Animación de participante
document.querySelectorAll('.participant').forEach(p => {
    p.addEventListener('click', () => {
        alert('Pinchaste en un participante. Aquí puedes ver más opciones.');
    });
});

console.log('Sistema de videollamadas cargado ✅');