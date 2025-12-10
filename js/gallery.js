// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const body = document.body;
    
    // Store all gallery images
    let currentImageIndex = 0;
    let images = [];
    
    // Initialize gallery data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img && img.src) {
            images.push(img.src);
            
            // Update click handler to use index
            item.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentImageIndex = index;
                openLightbox(img.src);
            };
        }
    });
    
    // Update lightbox with current image
    function updateLightbox() {
        lightboxImg.src = images[currentImageIndex];
    }
    
    // Open lightbox with specific image
    window.openLightbox = function(src) {
        const index = images.findIndex(img => img.includes(src.split('/').pop()));
        if (index !== -1) {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('show');
            body.classList.add('lightbox-open');
            
            // Hide navbar when lightbox is open
            const navbar = document.querySelector('.navbar');
            if (navbar) navbar.style.display = 'none';
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
    };
    
    // Close lightbox
    window.closeLightbox = function() {
        lightbox.classList.remove('show');
        body.classList.remove('lightbox-open');
        
        // Show navbar when closing lightbox
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.display = 'block';
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    };
    
    // Change image in lightbox
    window.changeImage = function(step) {
        currentImageIndex += step;
        
        // Wrap around if at the beginning or end
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        
        updateLightbox();
        return false; // Prevent default action
    };
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('close-btn')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                changeImage(-1);
                e.preventDefault();
                break;
            case 'ArrowRight':
                changeImage(1);
                e.preventDefault();
                break;
        }
    });
});
