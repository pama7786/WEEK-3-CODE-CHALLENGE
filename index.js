const filmListContainer = document.getElementById('filmListContainer');
const posterCard = document.getElementById('posterCard');
const infoCard = document.getElementById('infoCard');

let films;

// Function to fetch film data from API endpoint
async function fetchFilms() {
    // try-catch block to handle any errors that may occur while fetching data
  try {
    // send GET request to 'http://localhost:3000/films' to retrieve film data
    const response = await fetch('https://api.npoint.io/22969df1bc117d0ec873');
    films = await response.json();
    displayFilmList();
    displayFilmInfo(films[0].id);
  } catch (error) {
    console.error(error);
  }
}

// Function to create and display film list items
function displayFilmList() {
  films.forEach((film) => {
    const filmItem = document.createElement('div');
    filmItem.innerHTML = film.title;
    filmItem.classList.add('film-item');
    filmItem.setAttribute('data-id', film.id);
    filmItem.addEventListener('click', () => {
      displayFilmInfo(film.id);
    });
    filmListContainer.appendChild(filmItem);
  });
}

// Function to display film information
function displayFilmInfo(id) {
    const film = films.find((film) => film.id === id);
    posterCard.style.backgroundImage = `url(${film.poster})`;
    infoCard.innerHTML = `
      <h3>${film.title}</h3>
      <p>Runtime: ${film.runtime} minutes</p>
      <p>${film.description}</p>
      <p>Showtime: ${film.showtime}</p>
      <p>${film.capacity - film.tickets_sold} tickets remaining</p>
      <button id="buyTicketBtn">Buy Ticket</button>
    `;
    const buyTicketBtn = document.getElementById('buyTicketBtn');
    if (film.capacity - film.tickets_sold === 0) {
      buyTicketBtn.innerText = 'Sold Out';
      buyTicketBtn.classList.add('sold-out');
    } else {
      buyTicketBtn.innerText = 'Buy Ticket';
      buyTicketBtn.classList.remove('sold-out');
      buyTicketBtn.addEventListener('click', () => {
        film.tickets_sold++;
        displayFilmInfo(film.id);
      });
    }
  }
  
  fetchFilms();


//   function updateTicket(newTicket, id) {
//     const updateURL = `http://localhost:3000/films/${id}`;

//     fetch(updateURL, {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ tickets_sold: newTicket }),
//     })
//     .then((res) => {
//         if (!res.ok) {
//         throw new Error('Failed to update ticket count on the server');
//         }
//         console.log('Ticket count updated successfully');
//     })
//     .catch((error) => {
//         console.error('Error:', error.message);
// });
//  }
