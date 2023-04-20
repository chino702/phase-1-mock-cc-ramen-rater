const ramenMenu = document.querySelector('#ramen-menu');
const ramenDetail = document.querySelector('#ramen-detail');
const newRamenForm = document.querySelector('#new-ramen');
const editRamenForm = document.querySelector('#edit-ramen');

// Get all ramen data from the server
fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    // Display all ramen images in the ramen-menu div
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id;
      ramenMenu.append(img);
    });

    // Display the details for the first ramen in the ramen-detail div
    const firstRamen = ramens[0];
    displayRamenDetails(firstRamen);
  });

// Event listener for clicking on a ramen image
ramenMenu.addEventListener('click', event => {
  if (event.target.matches('img')) {
    const ramenId = event.target.dataset.id;
    fetch(`http://localhost:3000/ramens/${ramenId}`)
      .then(response => response.json())
      .then(ramen => {
        // Display the details of the clicked ramen in the ramen-detail div
        displayRamenDetails(ramen);
      });
  }
});

// Event listener for submitting the new-ramen form
newRamenForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(newRamenForm);
  const name = formData.get('name');
  const restaurant = formData.get('restaurant');
  const image = formData.get('image');
  const rating = formData.get('rating');
  const comment = formData.get('comment');

  // Create a new ramen object and display it in the ramen-menu div
  const newRamen = {
    name,
    restaurant,
    image,
    rating,
    comment
  };
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamen)
  })
    .then(response => response.json())
    .then(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id;
      ramenMenu.append(img);
    });
  newRamenForm.reset();
});

// Helper function to display ramen details in the ramen-detail div
function displayRamenDetails(ramen) {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  const name = document.createElement('h2');
  name.textContent = ramen.name;

  const restaurant = document.createElement('h3');
  restaurant.textContent = ramen.restaurant;

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${ramen.rating}`;

  const comment = document.createElement('p');
  comment.textContent = `Comment: ${ramen.comment}`;

  ramenDetail.innerHTML = '';
  ramenDetail.append(img, name, restaurant, rating, comment);
}
