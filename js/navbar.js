// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
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
        isScrolling = setTimeout(handleScroll, 100);
    }, { passive: true });
    
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });
});
