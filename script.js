// SIMPLE SCRIPT - AUTO LOADS ALL IMAGES FROM YOUR FOLDER
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PART 1: AUTOMATICALLY LOAD ALL IMAGES =====
  const gallery = document.getElementById('gallery');
  const maxImages = 1000; // Maximum number of images to try loading
  
  // Show loading message
  gallery.innerHTML = '<div style="text-align: center; padding: 50px; color: #a68b76; grid-column: 1/-1;">Loading vintage photographs...</div>';
  
  // Function to check if image exists
  function imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
  
  // Load images properly
  async function loadImages() {
    let imageHtml = '';
    let existingImages = [];
    let loadingPromises = [];
    
    // First, check which images exist
    for (let i = 1; i <= maxImages; i++) {
      const imgUrl = `images/img${i}.jpg`;
      loadingPromises.push(
        imageExists(imgUrl).then(exists => {
          if (exists) {
            existingImages.push(i);
          }
        })
      );
      
      // Process in batches to avoid overwhelming
      if (i % 50 === 0) {
        await Promise.all(loadingPromises);
        loadingPromises = [];
      }
    }
    
    // Wait for any remaining promises
    if (loadingPromises.length > 0) {
      await Promise.all(loadingPromises);
    }
    
    // Now build HTML with only existing images
    if (existingImages.length > 0) {
      existingImages.forEach(num => {
        imageHtml += `<img src="images/img${num}.jpg" alt="Vintage photo ${num}" loading="lazy">`;
      });
      
      gallery.innerHTML = imageHtml;
      
      // Update footer with actual image count
      document.getElementById('imageCount').textContent = existingImages.length;
      
      console.log('✨ Loaded ' + existingImages.length + ' vintage photographs');
      
      // Setup lightbox after images are loaded
      setTimeout(setupLightbox, 500);
    } else {
      // No images found
      gallery.innerHTML = '<div style="text-align: center; padding: 50px; color: #a68b76;">No images found. Please add images to the "images" folder named img1.jpg, img2.jpg, etc.</div>';
      document.getElementById('imageCount').textContent = '0';
    }
  }
  
  // Start loading images
  loadImages();
  
  // ===== PART 2: LIGHTBOX FUNCTIONALITY =====
  function setupLightbox() {
    const images = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    let currentIndex = 0;
    
    if (images.length === 0) return;
    
    // Add click handlers to all images
    images.forEach((img, index) => {
      img.addEventListener('click', function() {
        currentIndex = index;
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
    
    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchEndX - touchStartX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe right - previous image
          currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
          // Swipe left - next image
          currentIndex = (currentIndex + 1) % images.length;
        }
        lightboxImg.src = images[currentIndex].src;
      }
    }
  }
});
