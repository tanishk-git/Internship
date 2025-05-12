const form = document.getElementById('artForm');
const gallery = document.getElementById('gallery');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  errorMsg.textContent = '';

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const imageInput = document.getElementById('image');

  if (!title || !description || !imageInput.files[0]) {
    errorMsg.textContent = 'All fields are required.';
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageURL = reader.result;
    addArtworkCard(title, description, imageURL);
    form.reset();
  };
  reader.readAsDataURL(imageInput.files[0]);
});

function addArtworkCard(title, description, imageURL) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded shadow overflow-hidden transition-transform hover:scale-105';

  card.innerHTML = `
    <img src="${imageURL}" alt="${title}" class="w-full h-48 object-cover"/>
    <div class="p-4">
      <h3 class="text-lg font-bold">${title}</h3>
      <p class="text-sm text-gray-600">${description}</p>
    </div>
  `;

  gallery.prepend(card);
}
