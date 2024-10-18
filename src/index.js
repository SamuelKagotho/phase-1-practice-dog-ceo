console.log('%c HI', 'color: firebrick')

let breedArray = [];

document.addEventListener('DOMContentLoaded', function () {
  loadDogImages();
  loadAllBreeds();
});

function loadDogImages() {
  const dogImageUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(dogImageUrl)
    .then(res => res.json())
    .then(data => {
      data.message.forEach(img => showDogImage(img));
    });
}

function showDogImage(src) {
  let imageContainer = document.querySelector('#dog-image-container');
  let imageElem = document.createElement('img');
  imageElem.src = src;
  imageContainer.appendChild(imageElem);
}

function loadAllBreeds() {
  const breedsApiUrl = 'https://dog.ceo/api/breeds/list/all';
  fetch(breedsApiUrl)
    .then(res => res.json())
    .then(data => {
      breedArray = Object.keys(data.message);
      refreshBreeds(breedArray);
      addDropdownListener();
    });
}

function refreshBreeds(breeds) {
  let breedList = document.querySelector('#dog-breeds');
  removeAllChildren(breedList);
  breeds.forEach(breed => appendBreed(breed));
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function filterBreedsStartingWith(letter) {
  refreshBreeds(breedArray.filter(breed => breed.startsWith(letter)));
}

function addDropdownListener() {
  let breedSelect = document.querySelector('#breed-dropdown');
  breedSelect.addEventListener('change', function (event) {
    filterBreedsStartingWith(event.target.value);
  });
}

function appendBreed(breed) {
  let breedList = document.querySelector('#dog-breeds');
  let listItem = document.createElement('li');
  listItem.innerText = breed;
  listItem.style.cursor = 'pointer';
  breedList.appendChild(listItem);
  listItem.addEventListener('click', highlightText);
}

function highlightText(event) {
  event.target.style.color = 'palevioletred';
}
