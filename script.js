const navLinks = document.querySelectorAll('.nav-item');
const logoTrigger = document.getElementById('logo-trigger');
const revealElements = document.querySelectorAll('.reveal');
const skillBtn = document.getElementById('go-to-skills');
const backBtn = document.getElementById('go-to-about');
const aboutRoot = document.querySelector('.horizontal-root');
const sections = document.querySelectorAll('section');
const menuToggle = document.getElementById('menu-toggle');

if (skillBtn && aboutRoot) {
    skillBtn.addEventListener('click', () => {
        // Scrolls the horizontal container to the width of one slide
        const slideWidth = document.querySelector('.slide').offsetWidth;
        aboutRoot.scrollTo({
            left: slideWidth,
            behavior: 'smooth'
        });
    });
}

if (backBtn && aboutRoot) {
    backBtn.addEventListener('click', () => {
        // Scrolls the horizontal container back to the start (0)
        aboutRoot.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    });
}

const resetObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the user scrolls away from the About section entirely
        if (!entry.isIntersecting) {
            aboutRoot.scrollTo({ left: 0 }); 
        }
    });
}, { threshold: 0.1 });

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
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.checked = false;
    });
});

const scrollOptions = {
    threshold: 0.6, // Highlight when 60% of the section is visible
    rootMargin: "0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the id of the section in view
            const id = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Add active class if the href matches the section id
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            // Re-trigger the reveal animation
            entry.target.classList.add('active');
        } else {
            // Optional: remove reveal class when leaving (keeps it clean)
            entry.target.classList.remove('active');
        }
    });
}, scrollOptions);

sections.forEach(section => {
    scrollObserver.observe(section);
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

const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        alert("Form submitted!");

        const email = document.getElementById('user-email').value;
        const message = document.getElementById('user-message').value;
        
        // Replace this with your actual email address
        const myEmail = "ihongjayr@gmail.com"; 
        
        const subject = encodeURIComponent("Portfolio Feedback/Collaboration");
        const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);

        // Redirects user to their email client
       const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    });
}

revealElements.forEach(el => revealObserver.observe(el));
resetObserver.observe(aboutRoot);

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('back-to-top');
const homeSection = document.getElementById('home');

function updateBackToTop() {
    if (!backToTopBtn || !homeSection) return;
    const homeBottom = homeSection.getBoundingClientRect().bottom;
    // Show only when #home has fully scrolled out of view
    if (homeBottom <= 0) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}