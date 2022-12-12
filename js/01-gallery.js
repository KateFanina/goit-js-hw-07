import { galleryItems } from './gallery-items.js';

let selectedImage;
const body = document.body;
const gallery = document.querySelector('.gallery');
const galleryHtmlText = galleryItems
  .map(
    ({ preview, original, description }) => `
    <div class="gallery__item">
        <a class="gallery__link" href=${original}>
        <img class="gallery__image" src=${preview} data-source=${original} alt=${description} />
       </a>
    </div>`
  )
  .join('');
gallery.insertAdjacentHTML('beforeend', galleryHtmlText);

gallery.addEventListener('click', openImage);
body.addEventListener('keydown', closeImage);

function openImage(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') {
    return;
  }
  selectedImage = basicLightbox.create(
    `<img src=${target.dataset.source} alt=${target.alt} width="800" height="600" />`
  );
  selectedImage.show();
}

function closeImage(event) {
  if (event.code === 'Escape') {
    selectedImage.close();
  }
}
