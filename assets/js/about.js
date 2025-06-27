// Enhanced navigation with proper ARIA states
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Active navigation state with intersection observer
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50% 0px'
};
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.setAttribute('aria-current', 'false');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }
    });
}, observerOptions);
sections.forEach(section => {
    navObserver.observe(section);
});
// Enhanced animation observer with reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    document.querySelectorAll('.project-card, .publication-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(card);
    });
}
// Performance optimization: Lazy load project visuals
const projectVisuals = document.querySelectorAll('.project-visual');
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            lazyLoadObserver.unobserve(entry.target);
        }
    });
});
projectVisuals.forEach(visual => {
    visual.style.opacity = '0.8';
    visual.style.transition = 'opacity 0.3s ease';
    lazyLoadObserver.observe(visual);
}); 