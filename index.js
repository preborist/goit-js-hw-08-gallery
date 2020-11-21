import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('div.lightbox'),
  lightboxImg: document.querySelector('img.lightbox__image'),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  lightboxOverlay: document.querySelector('div.lightbox__overlay'),
};

const galleryItemsHtml = galleryItems.map(
  ({ preview, original, description }) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const image = document.createElement('img');

    item.classList.add('gallery__item');
    link.classList.add('gallery__link');
    image.classList.add('gallery__image');

    link.setAttribute('href', original);
    image.setAttribute('src', preview);
    image.setAttribute('alt', description);
    image.setAttribute('data-source', original);

    link.append(image);
    item.append(link);

    return item;
  },
);

refs.gallery.append(...galleryItemsHtml);

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;
  if (imageRef.nodeName !== 'IMG') {
    return;
  }
  const largeImageUrl = imageRef.dataset.source;
  refs.lightbox.classList.add('is-open');
  refs.lightboxCloseBtn.addEventListener('click', onCloseBtnClick);
  refs.lightboxOverlay.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onPressEscape);

  setLargeImgSrc(largeImageUrl);
}

function setLargeImgSrc(url) {
  refs.lightboxImg.src = url;
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onPressEscape);
  refs.lightbox.classList.remove('is-open');
  clearLargeImgSrc();
}

function clearLargeImgSrc() {
  refs.lightboxImg.src = '';
}
