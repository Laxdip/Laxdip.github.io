// CLEAN & FAST IMAGE GALLERY
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('gallery');
  const imageCountSpan = document.getElementById('imageCount');
  const maxImages = 100; // Adjust based on your actual number of images
  
  // Show loading state
  gallery.innerHTML = '<div class="loading">Loading vintage photographs</div>';
  
  // Store loaded images
  let loadedImages = [];
  let imagesLoaded = 0;
  
  // Function to check and load images
  function loadImages() {
    // Try to load images sequentially
    function tryLoadImage(index) {
      if (index > maxImages) {
        // All attempts finished
        finishLoading();
        return;
      }
      
      const img = new Image();
      img.src = `images/img${index}.jpg`;
      
      img.onload = function() {
        // Image exists, add to gallery
        loadedImages.push(index);
        imagesLoaded++;
        imageCountSpan.textContent = imagesLoaded;
        
        // Continue to next image
        tryLoadImage(index + 1);
      };
      
      img.onerror = function() {
        // Image doesn't exist, continue to next
        tryLoadImage(index + 1);
      };
    }
    
    // Start loading from image 1
    tryLoadImage(1);
  }
  
  // Function to render gallery after all images are found
  function finishLoading() {
    if (loadedImages.length === 0) {
      gallery.innerHTML = '<div class="loading" style="color: #a68b76;">No images found in images folder</div>';
      return;
    }
    
    // Clear loading message
    gallery.innerHTML = '';
    
    // Create and append all image elements at once (faster)
    const fragment = document.createDocumentFragment();
    
    loadedImages.forEach(num => {
      const img = document.createElement('img');
      img.src = `images/img${num}.jpg`;
      img.alt = `Vintage photo ${num}`;
      img.loading = 'lazy';
      img.setAttribute('data-index', num);
      fragment.appendChild(img);
    });
    
    gallery.appendChild(fragment);
    
    // Setup lightbox after images are added
    setupLightbox();
  }
  
  // Lightbox functionality
  function setupLightbox() {
    const images = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (images.length === 0) return;
    
    // Open lightbox on image click
    images.forEach(img => {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
    
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Start loading images
  loadImages();
});
