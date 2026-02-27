// SIMPLE SCRIPT - AUTO LOADS ALL IMAGES FROM YOUR FOLDER
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PART 1: AUTOMATICALLY LOAD ALL IMAGES =====
  const gallery = document.getElementById('gallery');
  const maxImages = 100; // Start with fewer images to test
  
  // Clear any existing content
  gallery.innerHTML = '';
  
  // Function to load images one by one
  function loadImages() {
    let loadedCount = 0;
    let imageHtml = '';
    
    // Try to load first 100 images
    for (let i = 1; i <= maxImages; i++) {
      // Create image element
      const img = document.createElement('img');
      img.src = `images/img${i}.jpg`;
      img.alt = `Vintage photo ${i}`;
      img.loading = 'lazy';
      
      // Handle successful load
      img.onload = function() {
        loadedCount++;
        document.getElementById('imageCount').textContent = loadedCount;
        console.log(`Loaded image ${i}`);
      };
      
      // Handle failed load - remove the image
      img.onerror = function() {
        this.style.display = 'none';
      };
      
      // Add to gallery
      gallery.appendChild(img);
    }
    
    // Update footer after all attempts
    setTimeout(() => {
      const visibleImages = document.querySelectorAll('.gallery img[style="display: none;"]').length;
      const totalVisible = document.querySelectorAll('.gallery img:not([style*="display: none"])').length;
      document.getElementById('imageCount').textContent = totalVisible;
      console.log('✨ Loaded ' + totalVisible + ' vintage photographs');
      
      // Setup lightbox after images are loaded
      setupLightbox();
    }, 2000);
  }
  
  // Start loading
  loadImages();
  
  // ===== PART 2: LIGHTBOX FUNCTIONALITY =====
  function setupLightbox() {
    // Get only visible images
    const images = Array.from(document.querySelectorAll('.gallery img')).filter(
      img => img.style.display !== 'none' && img.complete && img.naturalHeight > 0
    );
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (images.length === 0) return;
    
    // Add click handlers to all images
    images.forEach((img, index) => {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
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
