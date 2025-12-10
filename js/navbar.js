// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMenu = document.querySelector('.nav-links');
    
    if (!navbar) return; // Exit if no navbar found
    
    const navbarHeight = navbar.offsetHeight;
    let lastScroll = 0;
    
    // Add padding to body to prevent content jump when navbar hides
    body.style.paddingTop = `${navbarHeight}px`;
    
    // Add transition for smooth show/hide
    navbar.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    
    // Function to handle scroll events
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        const scrollThreshold = 100; // Pixels to scroll before hiding navbar
        
        // If scrolling down and past threshold, hide navbar
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.boxShadow = 'none';
        } 
        // If scrolling up or at the top, show navbar
        else if (currentScroll < lastScroll || currentScroll === 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }
    
    // Add scroll event listener with debounce
    let isScrolling;
    window.addEventListener('scroll', () => {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            handleScroll();
            updateActiveSection();
        }, 100);
    }, { passive: true });
    
    // Function to update active section in navigation
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active section on page load
    updateActiveSection();
    
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.hamburger');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });
});
