class PhotoGallery {
  constructor() {
    this.photos = [
      {
        id: 1,
        src: 'assets/photos/amsterdam-canals.jpg',
        thumb: 'assets/photos/thumbs/amsterdam-canals.jpg',
        title: 'Amsterdam Canals',
        category: 'travel',
        location: 'Amsterdam, Netherlands',
        date: '2023-09-15',
        description: 'Early morning reflections along the historic canals'
      },
      {
        id: 2,
        src: 'assets/photos/nijmegen-sunset.jpg',
        thumb: 'assets/photos/thumbs/nijmegen-sunset.jpg',
        title: 'Nijmegen Sunset',
        category: 'local',
        location: 'Nijmegen, Netherlands',
        date: '2023-10-22',
        description: 'Golden hour over the Waal river'
      },
      {
        id: 3,
        src: 'assets/photos/chess-board.jpg',
        thumb: 'assets/photos/thumbs/chess-board.jpg',
        title: 'Strategy in Motion',
        category: 'hobby',
        location: 'Home',
        date: '2023-11-03',
        description: 'Mid-game complexity on the 64 squares'
      },
      {
        id: 4,
        src: 'assets/photos/conference-zurich.jpg',
        thumb: 'assets/photos/thumbs/conference-zurich.jpg',
        title: 'AI Conference Views',
        category: 'travel',
        location: 'Zurich, Switzerland',
        date: '2023-08-12',
        description: 'Lake Zurich from the conference venue'
      },
      {
        id: 5,
        src: 'assets/photos/radboud-campus.jpg',
        thumb: 'assets/photos/thumbs/radboud-campus.jpg',
        title: 'Campus in Autumn',
        category: 'local',
        location: 'Radboud University',
        date: '2023-10-18',
        description: 'Fall colors on the university grounds'
      },
      {
        id: 6,
        src: 'assets/photos/cycling-route.jpg',
        thumb: 'assets/photos/thumbs/cycling-route.jpg',
        title: 'Dutch Countryside',
        category: 'hobby',
        location: 'Near Nijmegen',
        date: '2023-09-30',
        description: 'Weekend cycling through the polders'
      }
    ];
    
    this.currentFilter = 'all';
    this.lightboxOpen = false;
    this.currentPhotoIndex = 0;
    
    this.init();
  }
  
  init() {
    this.createFilterButtons();
    this.renderGallery();
    this.createLightbox();
    this.bindEvents();
  }
  
  createFilterButtons() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filters';
    
    const filters = [
      { key: 'all', label: 'All' },
      { key: 'travel', label: 'Travel' },
      { key: 'local', label: 'Local' },
      { key: 'hobby', label: 'Hobbies' }
    ];
    
    filters.forEach(filter => {
      const button = document.createElement('button');
      button.className = `filter-btn ${filter.key === 'all' ? 'active' : ''}`;
      button.textContent = filter.label;
      button.dataset.filter = filter.key;
      filterContainer.appendChild(button);
    });
    
    const main = document.querySelector('main');
    const galleryGrid = document.querySelector('.gallery-grid');
    main.insertBefore(filterContainer, galleryGrid);
  }
  
  renderGallery() {
    const grid = document.querySelector('.gallery-grid');
    grid.innerHTML = '';
    
    const filteredPhotos = this.currentFilter === 'all' 
      ? this.photos 
      : this.photos.filter(photo => photo.category === this.currentFilter);
    
    filteredPhotos.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.photoId = photo.id;
      
      // Create placeholder for lazy loading
      const img = document.createElement('img');
      img.dataset.src = photo.thumb || photo.src;
      img.alt = photo.title;
      img.className = 'gallery-image lazy-load';
      
      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      
      const caption = document.createElement('div');
      caption.className = 'gallery-caption';
      caption.innerHTML = `
        <h3>${photo.title}</h3>
        <p>${photo.location} • ${this.formatDate(photo.date)}</p>
      `;
      
      overlay.appendChild(caption);
      item.appendChild(img);
      item.appendChild(overlay);
      grid.appendChild(item);
    });
    
    // Initialize lazy loading
    this.initLazyLoading();
  }
  
  initLazyLoading() {
    const images = document.querySelectorAll('.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#8249;</button>
        <button class="lightbox-next">&#8250;</button>
        <div class="lightbox-image-container">
          <img class="lightbox-image" src="" alt="">
        </div>
        <div class="lightbox-info">
          <h3 class="lightbox-title"></h3>
          <div class="lightbox-meta">
            <span class="lightbox-location"></span>
            <span class="lightbox-date"></span>
          </div>
          <p class="lightbox-description"></p>
        </div>
      </div>
    `;
    
    document.body.appendChild(lightbox);
  }
  
  bindEvents() {
    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderGallery();
      }
      
      // Gallery items
      if (e.target.closest('.gallery-item')) {
        const photoId = parseInt(e.target.closest('.gallery-item').dataset.photoId);
        this.openLightbox(photoId);
      }
      
      // Lightbox controls
      if (e.target.classList.contains('lightbox-close')) {
        this.closeLightbox();
      }
      if (e.target.classList.contains('lightbox-prev')) {
        this.previousPhoto();
      }
      if (e.target.classList.contains('lightbox-next')) {
        this.nextPhoto();
      }
      if (e.target.classList.contains('lightbox') && !e.target.closest('.lightbox-content')) {
        this.closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.lightboxOpen) {
        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.previousPhoto();
            break;
          case 'ArrowRight':
            this.nextPhoto();
            break;
        }
      }
    });
  }
  
  openLightbox(photoId) {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;
    
    this.currentPhotoIndex = this.photos.indexOf(photo);
    this.lightboxOpen = true;
    
    const lightbox = document.querySelector('.lightbox');
    const image = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.lightbox-title');
    const location = lightbox.querySelector('.lightbox-location');
    const date = lightbox.querySelector('.lightbox-date');
    const description = lightbox.querySelector('.lightbox-description');
    
    image.src = photo.src;
    image.alt = photo.title;
    title.textContent = photo.title;
    location.textContent = photo.location;
    date.textContent = this.formatDate(photo.date);
    description.textContent = photo.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    this.lightboxOpen = false;
  }
  
  previousPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    this.openLightbox(this.photos[this.currentPhotoIndex].id);
  }
  
  nextPhoto() {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    this.openLightbox(this.photos[this.currentPhotoIndex].id);
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.gallery-grid')) {
    new PhotoGallery();
  }
});