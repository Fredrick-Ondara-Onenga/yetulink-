     // Slideshow functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 6000);
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Card animation on scroll
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.classList.add('visible');
                }
            });
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', function() {
            nav.classList.add('active');
        });
        
        closeMenu.addEventListener('click', function() {
            nav.classList.remove('active');
            // Close all dropdowns when closing the menu
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            // Reset dropdown toggle arrows
            document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        });
        
        // Mobile dropdown functionality
        document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement.nextElementSibling;
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                
                // Toggle arrow direction
                this.classList.toggle('active');
            });
        });
        
        // Close mobile menu when clicking on a non-dropdown link
        const navLinks = document.querySelectorAll('nav ul li a:not(.mobile-dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                // Reset dropdown toggle arrows
                document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                });
            });
        });

        // Initialize card animations
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.classList.add('visible');
                }
            });
        });

        // Unified category filtering functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Create a single observer for all cards
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe all card types
            const allCards = document.querySelectorAll('.event-card, .product-card, .service-card');
            allCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(card);
            });
            
            // Single event handler for all category buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('category-btn')) {
                    const button = e.target;
                    const section = button.closest('.premium-events, .exquisite-products, .premium-services');
                    
                    // Remove active class from all buttons in this section
                    const sectionButtons = section.querySelectorAll('.category-btn');
                    sectionButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Get the category to filter by
                    const category = button.getAttribute('data-category');
                    
                    // Find the appropriate cards container and cards
                    let cardsContainer, cards;
                    if (section.classList.contains('premium-events')) {
                        cardsContainer = section.querySelector('.events-container');
                        cards = cardsContainer.querySelectorAll('.event-card');
                    } else if (section.classList.contains('exquisite-products')) {
                        cardsContainer = section.querySelector('.products-container');
                        cards = cardsContainer.querySelectorAll('.product-card');
                    } else if (section.classList.contains('premium-services')) {
                        cardsContainer = section.querySelector('.services-container');
                        cards = cardsContainer.querySelectorAll('.service-card');
                    }
                    
                    // Show/hide cards based on category
                    if (cards) {
                        cards.forEach(card => {
                            if (category === 'all' || card.getAttribute('data-category') === category) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                }
            });
        });

            // Simple form submission handler
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                this.reset();
            }
        });