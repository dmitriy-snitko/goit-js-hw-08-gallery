import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightboxImage'),
  lightboxOverlay: document.querySelector('.js-lightboxOverlay'),
  closeLightboxBtn: document.querySelector('button[data-action = "close-lightbox"]')
};

let galleryCurrentItem = null;

refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

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
  galleryCurrentItem = e.path[2];
};

function lightboxClose() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';

  document.removeEventListener('keydown', onKeyDown);
};

function onKeyDown(e) {
  const galleryPreviousItem = galleryCurrentItem.previousElementSibling;
  const galleryNextItem = galleryCurrentItem.nextElementSibling;

  if (e.code === 'ArrowLeft' && galleryPreviousItem) {
    galleryCurrentItem = galleryPreviousItem;
  }

  if (e.code === 'ArrowRight' && galleryNextItem) {
    galleryCurrentItem = galleryNextItem;
  }

  if (e.code === 'Escape') {
    lightboxClose();
  }

  refs.lightboxImage.src = galleryCurrentItem.querySelector('.gallery__image').dataset.source;
  refs.lightboxImage.alt = galleryCurrentItem.querySelector('.gallery__image').alt;
}