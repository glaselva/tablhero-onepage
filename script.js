document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 2. Cookie Banner Logic (GDPR Simple)
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    // Check localStorage
    if (!localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.add('hidden');
        // Qui attiveresti Google Analytics ecc.
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.add('hidden');
    });

    // Gestione Preferenze (dal footer)
    document.getElementById('cookie-settings-btn').addEventListener('click', () => {
        cookieBanner.classList.remove('hidden');
    });
});

// 3. Mobile Burger Menu Toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuIcon.classList.toggle('active');
});

// Chiudi menu quando si clicca su un link (utile per anchor scroll)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuIcon.classList.remove('active');
    });
});

// Chiudi con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuIcon.classList.remove('active');
    }
});

// Easter Egg: Ruota i dadi al click
document.querySelectorAll('.card-icon, .floating-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // Aggiungi classe 'roll'
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'rotate(360deg) scale(1.2)';
        
        // Resetta dopo l'animazione
        setTimeout(() => {
            this.style.transform = '';
            // Se era un'icona fluttuante, ripristina l'animazione float dal CSS
            if(this.classList.contains('floating-icon')) {
                this.style.transform = ''; // Lascia gestire al CSS
            }
        }, 500);
    });
});

// EASTER EGG MIMIC E DRAGO
const dragon = document.querySelector('.loot-icon');
if(dragon) {
    dragon.addEventListener('mouseenter', () => {
        dragon.textContent = '🔥🐉'; // Si sveglia
    });
    dragon.addEventListener('mouseleave', () => {
        dragon.textContent = '💤🐉'; // Dorme
    });
}

const mimic = document.querySelector('.mimic-trap img');
if(mimic) {
    mimic.addEventListener('click', () => {
        mimic.src = "img/mimic.jpg";
        mimic.parentElement.classList.add('mimic-shake');
        setTimeout(() => alert("🦷 AARGH! È UN MIMIC!"), 200);
    });
}

// DUNGEON MODE (TORCH EFFECT + AUDIO)
const torchToggle = document.getElementById('torch-toggle');
const darkness = document.getElementById('darkness-overlay');
const body = document.body;

// Carica l'audio (Link GitHub diretto "raw" per evitare blocchi CORS)
// Suono: "Wind Howl"
const dungeonAudio = new Audio('https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3'); 
dungeonAudio.loop = true;  // Ripeti all'infinito
dungeonAudio.volume = 0.5; // Volume medio

// 1. Attiva/Disattiva
if (torchToggle) {
    torchToggle.addEventListener('click', () => {
        body.classList.toggle('dungeon-mode');
        
        // Cambia icona e gestisci effetti
        if (body.classList.contains('dungeon-mode')) {
            // ACCESO 🔥
            torchToggle.innerHTML = "🔥"; 
            
            // Attiva listener mouse
            document.addEventListener('mousemove', moveTorch);
            
            // Play Audio
            dungeonAudio.play().catch(error => {
                console.log("Audio bloccato dal browser (errore CORS o policy):", error);
            });
            
        } else {
            // SPENTO 🕯️
            torchToggle.innerHTML = "🕯️"; 
            
            // Rimuovi listener per performance
            document.removeEventListener('mousemove', moveTorch);
            
            // Stop Audio e riavvolgi
            dungeonAudio.pause();
            dungeonAudio.currentTime = 0;
            
            // Resetta lo sfondo scuro
            if(darkness) darkness.style.background = ''; 
        }
    });
}

// 2. Muovi la luce
function moveTorch(e) {
    if (!body.classList.contains('dungeon-mode') || !darkness) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Aggiorna il gradiente radiale: 
    // Trasparente al centro (mouse) -> Nero ai bordi
    darkness.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.98) 100%)`;
}
