// Elementos del DOM
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date-display');
const modalOverlay = document.getElementById('call-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

let currentAction = null;

// --- Reloj y Fecha ---
function updateClockAndDate() {
    const now = new Date();
    
    // Hora (Ej: 10:15 AM)
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    
    // Fecha (Ej: Miércoles, 6 de Mayo, 2026)
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const dayName = days[now.getDay()];
    const dayNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    dateElement.textContent = `${dayName}, ${dayNum} de ${monthName}, ${year}`;
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();


// --- Lógica del Modal ---
function showModal(title, desc, confirmText, confirmColor, action) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalConfirm.textContent = confirmText;
    modalConfirm.style.background = confirmColor;
    currentAction = action;
    modalOverlay.classList.add('active');
}

function hideModal() {
    modalOverlay.classList.remove('active');
    currentAction = null;
}

modalCancel.addEventListener('click', hideModal);

modalConfirm.addEventListener('click', () => {
    if (currentAction) currentAction();
    hideModal();
});


// --- Acciones de los Botones ---

document.getElementById('btn-llamar').addEventListener('click', () => {
    showModal(
        'Llamar a Familiares',
        '¿Deseas iniciar una llamada telefónica ahora?',
        'Llamar',
        'var(--btn-llamar-2)',
        () => { window.location.href = 'tel:'; } // Abre la app de teléfono
    );
});

document.getElementById('btn-whatsapp').addEventListener('click', () => {
    showModal(
        'WhatsApp',
        '¿Abrir WhatsApp para enviar un mensaje de voz?',
        'Abrir WhatsApp',
        'var(--btn-wa-2)',
        () => { window.location.href = 'https://wa.me/'; } // Abre WhatsApp
    );
});

document.getElementById('btn-videollamada').addEventListener('click', () => {
    showModal(
        'Videollamada',
        '¿Iniciar videollamada con familiares?',
        'Iniciar',
        'var(--btn-video-2)',
        () => { window.location.href = 'https://wa.me/'; } // En web, abre WA. En Android nativo se usaría intent.
    );
});

document.getElementById('btn-gps').addEventListener('click', () => {
    showModal(
        'Localización GPS',
        '¿Abrir Google Maps para ver la ubicación actual?',
        'Abrir Mapa',
        'var(--btn-gps-2)',
        () => { window.location.href = 'https://maps.google.com/'; } // Abre Maps
    );
});

document.getElementById('btn-sos').addEventListener('click', () => {
    showModal(
        '⚠️ EMERGENCIA (SOS)',
        '¿Llamar a los servicios de emergencia (112)?',
        'LLAMAR 112',
        'var(--btn-sos-1)',
        () => { window.location.href = 'tel:112'; } // Llama a emergencias
    );
});

// Botones de navegación (simulados)
document.getElementById('nav-back').addEventListener('click', () => {
    console.log('Atrás presionado');
});

document.getElementById('nav-home').addEventListener('click', () => {
    console.log('Inicio presionado');
});

document.getElementById('nav-settings').addEventListener('click', () => {
    alert('Ajustes no disponibles en esta demo.');
});
