import { galleryItems } from './gallery-items.js';

let selectedImage;
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

function openImage(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') {
    return;
  }

  selectedImage = basicLightbox.create(
    `<img src=${target.dataset.source} alt=${target.alt} width="800" height="600" />`,
    {
      onShow: selectedImage => {
        document.addEventListener('keydown', closeImage);
      },
      onClose: selectedImage => {
        document.removeEventListener('keydown', closeImage);
      },
    }
  );
  selectedImage.show();
}

function closeImage(event) {
  if (event.code === 'Escape') {
    selectedImage.close();
  }
}
