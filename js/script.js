document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const toggle = document.getElementById('toggle');
    const nav = document.getElementById('nav');
    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        if (nav.classList.contains('open')) {
            toggle.innerHTML = '<i class="fas fa-times"></i>'; // Change icon to 'X'
        } else {
            toggle.innerHTML = '<i class="fas fa-bars"></i>'; // Change icon back to hamburger
        }
    });

    // Parallax Effect for Hero Content
    const heroContent = document.getElementById('heroContent');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        heroContent.style.transform = `translate3d(${-x}px, ${-y}px, 0) perspective(1200px) rotateX(${y / 5}deg) rotateY(${-x / 5}deg)`;
    });

    // Particles for Hero Section
    const particlesContainer = document.getElementById('particles');
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 3}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `-${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, parseFloat(particle.style.animationDuration) * 1000);
    }
    // Generate a few particles initially and then continuously
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    setInterval(createParticle, 500); // Create a new particle every 500ms

    // Intersection Observer for Animations (FadeInUp)
    const animateElements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once element is visible
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'visible' class if element scrolls out of view
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust to trigger a bit earlier
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Specific Intersection Observer for Testimonial Cards
    const testimonialCards = document.querySelectorAll('.testimonial-card, .contact-info, .contact-form');
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                testimonialObserver.unobserve(entry.target); // Observe once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    testimonialCards.forEach(card => {
        testimonialObserver.observe(card);
    });

    // Portfolio Carousel Logic
    const carousel = document.getElementById('portfolioCarousel');
    if (carousel) {
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;

        function showSlide(index) {
            carouselItems.forEach((item, i) => {
                item.classList.remove('active');
                indicators[i].classList.remove('active');
            });
            carouselItems[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                showSlide(index);
            });
        });

        // Auto-play carousel
        let autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', () => autoPlayInterval = setInterval(nextSlide, 5000));
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
