import { refs } from './src/js/refs.js';
import { galleryItems } from './src/js/app.js';

const { lightBox, lightBoxImage, lightBoxBtn, gallery } = refs;

let currentImg;

function addItems(arr) {
  const arrItems = [];

  arr.map(item => {
    const { preview, original, description } = item;
    const galleryItem = document.createElement('li');
    const galleryItemLink = document.createElement('a');
    const galleryItemImg = document.createElement('img');
    galleryItem.classList.add('gallery__item');
    galleryItemLink.classList.add('gallery__link');
    galleryItemImg.classList.add('gallery__image');
    galleryItemLink.setAttribute('href', original);
    galleryItemImg.setAttribute('src', preview);
    galleryItemImg.setAttribute('data-source', original);
    galleryItemImg.setAttribute('alt', description);
    galleryItemLink.append(galleryItemImg);
    galleryItem.append(galleryItemLink);
    arrItems.push(galleryItem);
  });

  gallery.append(...arrItems);
}
addItems(galleryItems);

function openModal(e) {
  currentImg = e.target;
  if (currentImg.nodeName === 'IMG') {
    e.preventDefault();
    const url = currentImg.dataset.source;
    lightBox.classList.add('is-open');

    lightBoxImage.setAttribute('src', url);
  }
  lightBox.addEventListener('click', closeModalbyClick);
  window.addEventListener('keydown', closeModalByKey);
  document.addEventListener('keydown', handleKeydown);
}

gallery.addEventListener('click', openModal);

function closeModal() {
  lightBox.classList.remove('is-open');
  lightBoxImage.setAttribute('src', '');
  lightBox.removeEventListener('click', closeModalbyClick);
  window.removeEventListener('keydown', closeModalByKey);
  document.removeEventListener('keydown', handleKeydown);
}

function closeModalbyClick(e) {
  if (
    e.target.classList.contains('lightbox__overlay') ||
    e.target.classList.contains('lightbox__button')
  ) {
    closeModal();
  }
}

function closeModalByKey(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function handleKeydown(e) {
  let currentIndex = 0;
  galleryItems.forEach(img => {
    if (img.original === lightBoxImage.src) {
      currentIndex = galleryItems.indexOf(img);
    }
  });

  let nextIndex = currentIndex + 1;
  let previousIndex = currentIndex - 1;
  if (e.code === 'ArrowRight') {
    if (nextIndex >= galleryItems.length) {
      nextIndex = 0;
    }
    refs.lightBoxImage.src = galleryItems[nextIndex].original;
  }
  if (e.code === 'ArrowLeft') {
    if (previousIndex < 0) {
      previousIndex = galleryItems.length - 1;
    }
    refs.lightBoxImage.src = galleryItems[previousIndex].original;
  }
}
