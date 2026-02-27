// INSTANT LOADING IMAGE GALLERY
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('gallery');
  const imageCountSpan = document.getElementById('imageCount');
  
  // Maximum images to check (change this based on your actual count)
  const MAX_IMAGES = 50; // Adjust this number to match your actual images
  
  let html = '';
  let existingCount = 0;
  
  // Generate all images at once - INSTANT
  for (let i = 1; i <= MAX_IMAGES; i++) {
    html += `<img src="images/img${i}.jpg" alt="Vintage photo ${i}" loading="lazy" onerror="this.style.display='none'" onload="updateCount(this)">`;
  }
  
  // Insert all images at once
  gallery.innerHTML = html;
  
  // Function to count loaded images
  window.updateCount = function(img) {
    existingCount++;
    imageCountSpan.textContent = existingCount;
  };
  
  // Final count after all images attempt to load
  setTimeout(() => {
    const visibleImages = document.querySelectorAll('.gallery img[style*="display: none"]').length;
    const totalVisible = document.querySelectorAll('.gallery img:not([style*="display: none"])').length;
    imageCountSpan.textContent = totalVisible;
  }, 500);
  
  // ===== LIGHTBOX FUNCTIONALITY =====
  setTimeout(() => {
    const images = document.querySelectorAll('.gallery img:not([style*="display: none"])');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (images.length === 0) return;
    
    // Open lightbox
    images.forEach(img => {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }, 100);
});
