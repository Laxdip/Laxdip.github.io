// SIMPLE SCRIPT - AUTO LOADS ALL IMAGES FROM YOUR FOLDER
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PART 1: AUTOMATICALLY LOAD ALL IMAGES =====
  const gallery = document.getElementById('gallery');
  
  // Load up to 1000 images
  function loadAllImages() {
    let imageHtml = '';
    
    for (let i = 1; i <= 1000; i++) {
      imageHtml += `<img src="images/img${i}.jpg" alt="Vintage photo ${i}" loading="lazy">`;
    }
    
    gallery.innerHTML = imageHtml;
    
    // Small delay to let images start loading, then check which ones actually exist
    setTimeout(checkExistingImages, 1000);
  }
  
  // Function to remove broken image links
  function checkExistingImages() {
    const allImages = document.querySelectorAll('.gallery img');
    let existingCount = 0;
    
    allImages.forEach(img => {
      // Check if image loaded successfully
      if (img.complete && img.naturalHeight !== 0) {
        existingCount++;
      } else {
        // If image failed to load, remove it from gallery
        img.style.display = 'none';
      }
    });
    
    // Update footer with actual image count
    document.getElementById('imageCount').textContent = existingCount;
    
    // Re-attach lightbox events for existing images
    setupLightbox();
    
    console.log('✨ Loaded ' + existingCount + ' vintage photographs');
  }
  
  // Load all images
  loadAllImages();
  
  // ===== PART 2: LIGHTBOX FUNCTIONALITY (NO COUNTER) =====
  function setupLightbox() {
    // Get only images that successfully loaded
    const images = Array.from(document.querySelectorAll('.gallery img')).filter(
      img => img.style.display !== 'none'
    );
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    let currentIndex = 0;
    
    // Remove any old event listeners and add new ones
    images.forEach((img, index) => {
      // Remove old listener if any (to prevent duplicates)
      img.removeEventListener('click', img.clickHandler);
      
      // Create new handler (NO COUNTER CODE)
      img.clickHandler = function() {
        currentIndex = index;
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      
      // Add new listener
      img.addEventListener('click', img.clickHandler);
    });
    
    // Close lightbox when clicking X
    closeBtn.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Keyboard navigation (ESC to close)
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});