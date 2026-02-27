// ULTIMATE AUTO-DISCOVER - Loads ANY image from your folder!
document.addEventListener('DOMContentLoaded', function() {
  
  const gallery = document.getElementById('gallery');
  const username = 'laxdip';
  const repo = 'laxdip.github.io';
  
  // ===== ALL POSSIBLE IMAGE TYPES =====
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 
                      'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'SVG', 'BMP', 'ICO'];
  
  // ===== SMART LOADING =====
  async function loadAllImages() {
    let imageHtml = '';
    let totalChecks = 0;
    
    // Try numbers from 1 to 1000
    for (let i = 1; i <= 1000; i++) {
      // Try ALL extensions
      extensions.forEach(ext => {
        totalChecks++;
        const imgId = `img-${i}-${ext}`;
        imageHtml += `<img id="${imgId}" 
                           src="https://raw.githubusercontent.com/${username}/${repo}/main/images/img${i}.${ext}" 
                           data-number="${i}"
                           data-ext="${ext}"
                           alt="Vintage photo" 
                           loading="lazy"
                           style="display:none;"
                           onload="this.style.display='block'; this.setAttribute('data-loaded', 'true'); imageLoaded(this)"
                           onerror="tryNextImage(${i}, '${ext}')">`;
      });
      
      // Also try WITHOUT "img" prefix (for any random filenames)
      extensions.forEach(ext => {
        imageHtml += `<img src="https://raw.githubusercontent.com/${username}/${repo}/main/images/${i}.${ext}" 
                           data-number="${i}"
                           data-ext="${ext}"
                           alt="Vintage photo" 
                           loading="lazy"
                           style="display:none;"
                           onload="this.style.display='block'; this.setAttribute('data-loaded', 'true'); imageLoaded(this)"
                           onerror="this.remove()">`;
      });
    }
    
    gallery.innerHTML = imageHtml;
    
    // Keep checking for 30 seconds
    let checkCount = 0;
    const checkInterval = setInterval(() => {
      updateCount();
      checkCount++;
      if (checkCount > 30) {
        clearInterval(checkInterval);
        finalCount();
      }
    }, 1000);
  }
  
  // Track loaded images
  window.imageLoaded = function(img) {
    img.setAttribute('data-loaded', 'true');
    updateCount();
  };
  
  // Try next extension if current fails
  window.tryNextImage = function(number, failedExt) {
    const extIndex = extensions.indexOf(failedExt);
    if (extIndex < extensions.length - 1) {
      const nextExt = extensions[extIndex + 1];
      const nextImg = document.querySelector(`img[data-number="${number}"][data-ext="${nextExt}"]`);
      if (nextImg) {
        nextImg.src = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${number}.${nextExt}?t=${new Date().getTime()}`;
      }
    }
  };
  
  // Update footer count
  function updateCount() {
    const loadedImages = document.querySelectorAll('.gallery img[data-loaded="true"]').length;
    if (loadedImages > 0) {
      document.getElementById('imageCount').textContent = loadedImages;
    }
  }
  
  // Final count and cleanup
  function finalCount() {
    const loadedImages = document.querySelectorAll('.gallery img[data-loaded="true"]').length;
    document.getElementById('imageCount').textContent = loadedImages;
    console.log('🎉 Gallery ready! Loaded ' + loadedImages + ' images');
    
    // Remove any remaining hidden images
    document.querySelectorAll('.gallery img:not([data-loaded="true"])').forEach(img => img.remove());
  }
  
  // Start loading
  loadAllImages();
  
  // ===== SIMPLE LIGHTBOX =====
  function setupLightbox() {
    const images = document.querySelectorAll('.gallery img[data-loaded="true"]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    let currentIndex = 0;
    
    images.forEach((img, index) => {
      img.addEventListener('click', function() {
        currentIndex = index;
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
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
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Setup lightbox after loading
  setTimeout(setupLightbox, 3000);
  setTimeout(setupLightbox, 6000);
  setTimeout(setupLightbox, 10000);
});
