
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const galleryImages = createGalleryImages(gallery); 

galleryContainer.insertAdjacentHTML('afterbegin', galleryImages);

const lightBox = document.querySelector('.lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

function createGalleryImages(gallery) {
        return gallery.map(({ preview, original, description }) => {
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
    </li>
    `;
        })
        .join('');
}

galleryContainer.addEventListener('click', onClickImage);

function onClickImage(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  lightBox.classList.add('is-open');
  lightBoxImage.src = evt.target.dataset.source;
  lightBoxImage.alt = evt.target.alt;
} 

const lightBoxButton = document.querySelector('.lightbox__button')
lightBoxButton.addEventListener('click', onCloseModal);

  function onCloseModal(evt) {
    lightBox.classList.remove('is-open');
    lightBoxImage.removeAttribute('src');
    lightBoxImage.removeAttribute("alt");
  }

const onCloseModalOverlay = document.querySelector('.lightbox'); 
onCloseModalOverlay.addEventListener('click', onClickOverlay);

function onClickOverlay(evt) {
  if (!evt.target.classList.contains('lightbox__overlay')){
    return;
  }
  
  onCloseModal();
}

const onBtnEscCloseModal = document.querySelector('lightbox__content');
window.addEventListener('keydown', onBtnEscPress);

function onBtnEscPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }

}