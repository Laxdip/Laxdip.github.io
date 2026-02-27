// SIMPLE GITHUB SOLUTION - WORKS 100%!
document.addEventListener('DOMContentLoaded', function() {
  
  const gallery = document.getElementById('gallery');
  
  // YOUR EXACT IMAGES - just list them here!
  const images = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg',
    'img12.jpg',
    'img13.jpg',
    'img14.jpg',
    'img15.jpg',
    'img16.jpg',
    'img17.jpg',
    'img18.jpg',
    'img19.jpg',
    'img20.jpg',
    'img21.jpg',
    'img22.jpg',
    'img23.jpg',
    'img24.jpg',
    'img25.jpg',
    'img26.jpg',
    'img27.jpg'
  ];
  
  // Simple function to load images
  function loadImages() {
    let html = '';
    
    images.forEach(imageName => {
      html += `<img src="images/${imageName}" 
                    alt="Vintage" 
                    loading="lazy"
                    onerror="this.style.display='none'">`;
    });
    
    gallery.innerHTML = html;
    
    // Update count
    setTimeout(() => {
      const loaded = document.querySelectorAll('.gallery img:not([style*="display: none"])').length;
      document.getElementById('imageCount').textContent = loaded;
    }, 2000);
  }
  
  loadImages();
  
  // Simple lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  
  gallery.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
      lightboxImg.src = e.target.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
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
});
