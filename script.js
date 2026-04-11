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

// Gallery Filters and Lightbox Logic
document.addEventListener('DOMContentLoaded', () => {
    // Formatting: ensure only runs if gallery is present
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    
    if (filterBtns.length > 0 && masonryItems.length > 0) {
        // Filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                masonryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });

        // Lightbox
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        let currentImgIndex = 0;
        let visibleItems = Array.from(masonryItems); // Initially all items

        const updateVisibleItems = () => {
            visibleItems = Array.from(masonryItems).filter(item => item.style.display !== 'none');
        };

        const showLightbox = (index) => {
            updateVisibleItems();
            currentImgIndex = index;
            const imgSrc = visibleItems[currentImgIndex].querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const hideLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        const showNext = () => {
            currentImgIndex++;
            if (currentImgIndex >= visibleItems.length) currentImgIndex = 0;
            showLightbox(currentImgIndex);
        };

        const showPrev = () => {
            currentImgIndex--;
            if (currentImgIndex < 0) currentImgIndex = visibleItems.length - 1;
            showLightbox(currentImgIndex);
        };

        // Event listeners for opening lightbox
        masonryItems.forEach(item => {
            item.addEventListener('click', () => {
                updateVisibleItems();
                const index = visibleItems.indexOf(item);
                if (index > -1) {
                    showLightbox(index);
                }
            });
        });

        // Controls
        closeBtn.addEventListener('click', hideLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) hideLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') hideLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});
