// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    });
});

// Intersection Observer for Scroll Animations
const observeElements = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                // Stop observing once appeared for performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));
};

// Apply observers to animated elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

    observeElements(fadeUpElements, 'appear');
    observeElements(slideLeftElements, 'appear');
    observeElements(slideRightElements, 'appear');
    
    // Trigger animations for elements already in view on load immediately
    setTimeout(() => {
        fadeUpElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('appear');
            }
        });
        slideLeftElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('appear');
            }
        });
        slideRightElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('appear');
            }
        });
    }, 100);
});
