import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightboxImage'),
  lightboxOverlay: document.querySelector('.js-lightboxOverlay'),
  closeLightboxBtn: document.querySelector('button[data-action = "close-lightbox"]')
};

refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

let currentItemIndex = 0;
const galleryItemsRef = [...document.querySelectorAll('.gallery__item')];
const originalImageURLs = galleryItems.map(el => el.original);
const imageDescriptions = galleryItems.map(el => el.description);

refs.gallery.addEventListener('click', onGalleryImageClick);
refs.lightboxOverlay.addEventListener('click', lightboxClose);
refs.closeLightboxBtn.addEventListener('click', lightboxClose);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
  }).join('');
}

function onGalleryImageClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  e.preventDefault();

  refs.lightboxImage.src = e.target.dataset.source;
  refs.lightboxImage.alt = e.target.alt;
  refs.lightbox.classList.add('is-open');

  document.addEventListener('keydown', onKeyDown);

  currentItemIndex = galleryItemsRef.indexOf(e.path[2]);  
};

function lightboxClose() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';

  document.removeEventListener('keydown', onKeyDown);
};

function onKeyDown(e) {
  if (e.code === 'ArrowLeft' && currentItemIndex) {
    currentItemIndex -= 1;

    refs.lightboxImage.src = originalImageURLs[currentItemIndex];
    refs.lightboxImage.alt = imageDescriptions[currentItemIndex];
  }

  if (e.code === 'ArrowRight' && currentItemIndex < galleryItemsRef.length - 1) {
    currentItemIndex += 1;

    refs.lightboxImage.src = originalImageURLs[currentItemIndex];
    refs.lightboxImage.alt = imageDescriptions[currentItemIndex];
  }

  if (e.code === 'Escape') {
    lightboxClose();
  }
}