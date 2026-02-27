// ULTIMATE MOBILE FIX - Forces all images to load!
document.addEventListener('DOMContentLoaded', function() {
  
  const gallery = document.getElementById('gallery');
  const username = 'laxdip';
  const repo = 'laxdip.github.io';
  
  // Clear any cached/stuck images
  gallery.innerHTML = '';
  
  // Force load images one by one with verification
  function loadAllImages() {
    let imageHtml = '';
    
    // Your exact image range (16 to 252)
    for (let i = 16; i <= 252; i++) {
      // Add timestamp to bypass mobile cache
      const timestamp = new Date().getTime();
      const imgUrl = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${i}.jpg?t=${timestamp}`;
      
      imageHtml += `<img src="${imgUrl}" 
                         alt="Vintage photo ${i}" 
                         class="gallery-image"
                         data-index="${i}"
                         loading="lazy"
                         onload="this.setAttribute('data-loaded', 'true')"
                         onerror="handleImageError(this, ${i})">`;
    }
    
    gallery.innerHTML = imageHtml;
    
    // Aggressive checking - check every second for 30 seconds
    let checkCount = 0;
    const checkInterval = setInterval(() => {
      checkLoadedImages();
      checkCount++;
      
      // Stop after 30 checks (30 seconds)
      if (checkCount > 30) {
        clearInterval(checkInterval);
        // Final count
        const finalCount = document.querySelectorAll('.gallery img[data-loaded="true"]').length;
        document.getElementById('imageCount').textContent = finalCount;
        console.log('✨ Final loaded count: ' + finalCount);
      }
    }, 1000);
  }
  
  // Global error handler
  window.handleImageError = function(img, index) {
    console.log(`Retrying image ${index}...`);
    
    // Retry with fresh timestamp
    const timestamp = new Date().getTime();
    img.src = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${index}.jpg?t=${timestamp}`;
    
    // Mark as retried
    img.setAttribute('data-retry', 'true');
    
    // If still fails after retry, hide it
    setTimeout(() => {
      if (!img.complete || img.naturalHeight === 0) {
        if (img.getAttribute('data-retry') === 'true') {
          img.style.display = 'none';
          console.log(`Image ${index} failed after retry`);
        }
      }
    }, 3000);
  };
  
  function checkLoadedImages() {
    const allImages = document.querySelectorAll('.gallery img');
    let loadedCount = 0;
    let failedCount = 0;
    
    allImages.forEach(img => {
      // Check if image loaded successfully
      if (img.complete && img.naturalHeight > 0) {
        img.setAttribute('data-loaded', 'true');
        img.style.display = 'block';
        loadedCount++;
      } else if (!img.complete) {
        // Still loading
        failedCount++;
      }
    });
    
    // Update footer with loaded count
    document.getElementById('imageCount').textContent = loadedCount;
    
    // If we have less than expected, try to reload failed ones
    if (loadedCount < 200 && failedCount > 0) {
      allImages.forEach(img => {
        if (!img.complete && !img.getAttribute('data-retry')) {
          const index = img.getAttribute('data-index');
          if (index) {
            const timestamp = new Date().getTime();
            img.src = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${index}.jpg?t=${timestamp}`;
            img.setAttribute('data-retry', 'true');
          }
        }
      });
    }
    
    // Re-attach lightbox events
    setupLightbox();
  }
  
  // Start loading
  loadAllImages();
  
  // ===== LIGHTBOX FUNCTIONALITY =====
  function setupLightbox() {
    const images = Array.from(document.querySelectorAll('.gallery img[data-loaded="true"]'));
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
