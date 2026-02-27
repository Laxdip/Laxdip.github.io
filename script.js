// AUTO-DISCOVER - Finds ALL images in your folder automatically!
document.addEventListener('DOMContentLoaded', function() {
  
  const gallery = document.getElementById('gallery');
  const username = 'laxdip';
  const repo = 'laxdip.github.io';
  
  // ===== ALL IMAGE TYPES TO LOOK FOR =====
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'PNG'];
  
  // ===== LOAD IMAGES SMARTLY =====
  function loadImages() {
    let imageHtml = '';
    let totalAttempts = 0;
    
    // Try up to 500 images (more than enough)
    for (let i = 1; i <= 500; i++) {
      // Try each extension for every number
      extensions.forEach(ext => {
        totalAttempts++;
        // Create image with unique ID
        imageHtml += `<img src="https://raw.githubusercontent.com/${username}/${repo}/main/images/img${i}.${ext}" 
                           data-number="${i}"
                           data-ext="${ext}"
                           alt="Vintage photo" 
                           loading="lazy"
                           style="display:none; opacity:1"
                           onload="this.style.display='block'; imageLoaded(this)"
                           onerror="tryNextExtension(this, ${i}, '${ext}')">`;
      });
    }
    
    gallery.innerHTML = imageHtml;
    
    // Update count every 2 seconds
    setTimeout(updateCount, 2000);
    setTimeout(updateCount, 4000);
    setTimeout(updateCount, 6000);
    setTimeout(updateCount, 8000);
  }
  
  // ===== TRY NEXT EXTENSION IF CURRENT FAILS =====
  window.tryNextExtension = function(img, number, failedExt) {
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'PNG'];
    const currentExtIndex = extensions.indexOf(failedExt);
    
    // Try next extension
    if (currentExtIndex < extensions.length - 1) {
      const nextExt = extensions[currentExtIndex + 1];
      img.src = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${number}.${nextExt}?t=${new Date().getTime()}`;
      img.setAttribute('data-ext', nextExt);
    } else {
      // No more extensions to try - remove the image
      img.remove();
    }
  };
  
  // ===== MARK IMAGE AS LOADED =====
  window.imageLoaded = function(img) {
    img.setAttribute('data-loaded', 'true');
  };
  
  // ===== UPDATE IMAGE COUNT IN FOOTER =====
  function updateCount() {
    const loadedImages = document.querySelectorAll('.gallery img[data-loaded="true"]').length;
    if (loadedImages > 0) {
      document.getElementById('imageCount').textContent = loadedImages;
    }
    console.log('✨ Found ' + loadedImages + ' photographs');
  }
  
  // Start loading
  loadImages();
  
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
  
  // Setup lightbox after images load
  setTimeout(setupLightbox, 3000);
  setTimeout(setupLightbox, 6000);
});
