// IMPROVED SCRIPT - Better image loading for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PART 1: AUTOMATICALLY LOAD ALL IMAGES =====
  const gallery = document.getElementById('gallery');
  
  // Load up to 1000 images
  function loadAllImages() {
    let imageHtml = '';
    
    // Your images start from img16.jpg to img252.jpg
    for (let i = 16; i <= 300; i++) {
      imageHtml += `<img src="images/img${i}.jpg" alt="Vintage photo ${i}" loading="lazy" onerror="this.style.display='none'">`;
    }
    
    gallery.innerHTML = imageHtml;
    
    // Check images multiple times to ensure they all load
    setTimeout(checkExistingImages, 2000);
    setTimeout(checkExistingImages, 4000);
    setTimeout(checkExistingImages, 6000);
  }
  
  // Function to check which images loaded
  function checkExistingImages() {
    const allImages = document.querySelectorAll('.gallery img');
    let loadedCount = 0;
    let totalVisible = 0;
    
    allImages.forEach(img => {
      // Check if image loaded successfully
      if (img.complete && img.naturalHeight > 0) {
        img.style.display = 'block';
        loadedCount++;
      } else if (img.style.display !== 'none') {
        // If not loaded but not hidden, keep it but don't count yet
        totalVisible++;
      }
    });
    
    // Update footer with loaded count
    document.getElementById('imageCount').textContent = loadedCount;
    
    // Re-attach lightbox events
    setupLightbox();
    
    console.log('✨ Loaded ' + loadedCount + ' vintage photographs');
  }
  
  // Load all images
  loadAllImages();
  
  // ===== PART 2: LIGHTBOX FUNCTIONALITY =====
  function setupLightbox() {
    const images = Array.from(document.querySelectorAll('.gallery img')).filter(
      img => img.style.display !== 'none'
    );
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    let currentIndex = 0;
    
    images.forEach((img, index) => {
      img.removeEventListener('click', img.clickHandler);
      
      img.clickHandler = function() {
        currentIndex = index;
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      
      img.addEventListener('click', img.clickHandler);
    });
    
    closeBtn.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
