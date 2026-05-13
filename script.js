const navLinks = document.querySelectorAll('.nav-item');
const logoTrigger = document.getElementById('logo-trigger');
const revealElements = document.querySelectorAll('.reveal');
const skillBtn = document.getElementById('go-to-skills');
const backBtn = document.getElementById('go-to-about');
const aboutRoot = document.querySelector('.horizontal-root');
const horizontalWrapper = document.querySelector('.horizontal-wrapper');
const sections = document.querySelectorAll('section');
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const desktopHamburger = document.getElementById('desktop-hamburger');
const desktopNavMenu = document.getElementById('desktop-nav-menu');

// ─── HORIZONTAL SLIDE (About / Skills) ───────────────────────────────────────
let currentSlide = 0;
function goToSlide(index) {
    currentSlide = index;
    horizontalWrapper.style.transform = `translateX(-${index * 100}vw)`;
}
if (skillBtn) skillBtn.addEventListener('click', () => goToSlide(1));
if (backBtn)  backBtn.addEventListener('click',  () => goToSlide(0));

const resetObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (!entry.isIntersecting) goToSlide(0); });
}, { threshold: 0.1 });
if (aboutRoot) resetObserver.observe(aboutRoot);

// ─── NAVBAR + DESKTOP HAMBURGER ──────────────────────────────────────────────
const homeSection = document.getElementById('home');
const isDesktop = () => window.innerWidth >= 601;

function updateNavbar() {
    if (!homeSection) return;
    const homeBottom = homeSection.getBoundingClientRect().bottom;
    const pastHome = homeBottom <= 80;

    if (isDesktop()) {
        if (pastHome) {
            // Show full navbar pill, hide hamburger & dropdown
            navbar.classList.add('scrolled');
            desktopHamburger && desktopHamburger.classList.add('hidden');
            desktopNavMenu && desktopNavMenu.classList.add('hidden');
            desktopNavMenu && desktopNavMenu.classList.remove('open');
        } else {
            // Back on homepage — hide navbar, show hamburger
            navbar.classList.remove('scrolled');
            desktopHamburger && desktopHamburger.classList.remove('hidden');
            desktopNavMenu && desktopNavMenu.classList.remove('hidden');
        }
    }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', updateNavbar);
updateNavbar();

// ─── DESKTOP HAMBURGER TOGGLE ─────────────────────────────────────────────────
if (desktopHamburger && desktopNavMenu) {
    desktopHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopNavMenu.classList.toggle('open');
    });

    // Close when a link is clicked
    desktopNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            desktopNavMenu.classList.remove('open');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!desktopHamburger.contains(e.target) && !desktopNavMenu.contains(e.target)) {
            desktopNavMenu.classList.remove('open');
        }
    });
}

// ─── LOGO CLICK ───────────────────────────────────────────────────────────────
if (logoTrigger) {
    logoTrigger.addEventListener('click', () => {
        navLinks.forEach(n => n.classList.remove('active'));
    });
}

// ─── MOBILE NAV ACTIVE + HAMBURGER CLOSE ─────────────────────────────────────
navLinks.forEach(link => {
    link.addEventListener('mousedown', function () {
        navLinks.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
    });
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.checked = false;
    });
});

// ─── INTERSECTION: nav highlight + reveal ────────────────────────────────────
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.6 });
sections.forEach(section => scrollObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
        else entry.target.classList.remove('active');
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Form submitted!");
        const email   = document.getElementById('user-email').value;
        const message = document.getElementById('user-message').value;
        const myEmail = "ihongjayr@gmail.com";
        const subject = encodeURIComponent("Portfolio Feedback/Collaboration");
        const body    = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`, '_blank');
    });
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
const backToTopBtn = document.getElementById('back-to-top');
function updateBackToTop() {
    if (!backToTopBtn || !homeSection) return;
    const homeBottom = homeSection.getBoundingClientRect().bottom;
    backToTopBtn.classList.toggle('visible', homeBottom <= 0);
}
window.addEventListener('scroll', updateBackToTop, { passive: true });
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}