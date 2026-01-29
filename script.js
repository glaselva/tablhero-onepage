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

// Aggiungi in script.js
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
