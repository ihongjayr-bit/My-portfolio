const navLinks = document.querySelectorAll('.nav-item');
const logoTrigger = document.getElementById('logo-trigger');
const revealElements = document.querySelectorAll('.reveal');

if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
    navLinks.forEach(n => n.classList.remove('active'));
        });
}

// 1. Force Animation Replay on Click
function triggerAnimation(targetId) {
    const section = document.querySelector(targetId);
    if (!section) return;
    
    const revealBoxes = section.querySelectorAll('.reveal');
    revealBoxes.forEach(box => {
        box.classList.remove('active');
        setTimeout(() => box.classList.add('active'), 10);
    });
}

// 2. Nav Click Logic
navLinks.forEach(link => {
    link.addEventListener('mousedown', function() {
        navLinks.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        triggerAnimation(this.getAttribute('href'));
    });
});

// 3. Intersection Observer (Scroll behavior)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active'); // Reset so it replays
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));