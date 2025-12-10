// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Store all gallery images
    let currentImageIndex = 0;
    let images = [];
    
    // Initialize gallery data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push(img.src);
        
        // Update click handler to use index
        item.onclick = function(e) {
            e.stopPropagation();
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            document.documentElement.style.overflow = 'hidden'; // For older browsers
        };
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
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
    };
    
    // Close lightbox
    window.closeLightbox = function() {
        lightbox.classList.remove('show');
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
    };
    
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
