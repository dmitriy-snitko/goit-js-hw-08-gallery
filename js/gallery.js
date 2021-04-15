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

refs.gallery.addEventListener('click', onGalleryImageClick);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image lazyload"
        data-src="${preview}"
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

  setImageAtribute(e.target.dataset.source, e.target.alt);

  refs.lightbox.classList.add('is-open');

  refs.lightboxOverlay.addEventListener('click', lightboxClose);
  refs.closeLightboxBtn.addEventListener('click', lightboxClose);
  document.addEventListener('keydown', onKeyDown);

  currentItemIndex = galleryItemsRef.indexOf(e.path[2]);
};

function lightboxClose() {
  refs.lightbox.classList.remove('is-open');

  setImageAtribute('', '');

  document.removeEventListener('keydown', onKeyDown);
  refs.lightboxOverlay.removeEventListener('click', lightboxClose);
  refs.closeLightboxBtn.removeEventListener('click', lightboxClose);
};

function onKeyDown(e) {
  const lastImageIndex = galleryItems.length - 1;

  if (e.code === 'ArrowLeft') {
    currentItemIndex === 0
      ? currentItemIndex = lastImageIndex
      : currentItemIndex -= 1;
  }

  if (e.code === 'ArrowRight') {
    currentItemIndex === lastImageIndex
      ? currentItemIndex = 0
      : currentItemIndex += 1;
  }

  if (e.code === 'Escape') {
    lightboxClose();
  }

  const src = galleryItems[currentItemIndex].original;
  const alt = galleryItems[currentItemIndex].description;

  setImageAtribute(src, alt);
}

function setImageAtribute(src, alt) {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
}