// ULTIMATE FIX - Uses GitHub's raw content for reliable loading
document.addEventListener('DOMContentLoaded', function() {
  
  const gallery = document.getElementById('gallery');
  
  // Get your GitHub username
  const username = 'laxdip';
  const repo = 'laxdip.github.io';
  
  // Load images from GitHub's raw content server (much faster!)
  function loadAllImages() {
    let imageHtml = '';
    
    // Try images from 16 to 300
    for (let i = 16; i <= 300; i++) {
      // Use GitHub's raw content URL
      const imgUrl = `https://raw.githubusercontent.com/${username}/${repo}/main/images/img${i}.jpg`;
      imageHtml += `<img src="${imgUrl}" alt="Vintage photo ${i}" loading="lazy" onerror="this.style.display='none'">`;
    }
    
    gallery.innerHTML = imageHtml;
    
    // Check loading status multiple times
    setTimeout(checkLoadedImages, 2000);
    setTimeout(checkLoadedImages, 4000);
    setTimeout(checkLoadedImages, 6000);
    setTimeout(checkLoadedImages, 8000);
  }
  
  function checkLoadedImages() {
    const allImages = document.querySelectorAll('.gallery img');
    let loadedCount = 0;
    
    allImages.forEach(img => {
      if (img.complete && img.naturalHeight > 0) {
        img.style.display = 'block';
        loadedCount++;
      }
    });
    
    document.getElementById('imageCount').textContent = loadedCount;
    setupLightbox();
  }
  
  loadAllImages();
  
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
