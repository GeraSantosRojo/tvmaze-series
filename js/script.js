const container = document.getElementById('series-container');

async function fetchShows() { // Función para obtener los shows desde la API
    try {
        const response = await axios.get('https://api.tvmaze.com/shows'); // Realizamos una petición GET a la API de TVmaze, con Axios.
        const shows = response.data.slice(0, 26); //Mostraremos solo 26 shows
        shows.forEach(show => createShowCard(show)); // Llamamos a la función para crear las tarjetas de los shows
    } catch (error) { // Manejo de errores
        console.error('Error al obtener el show:', error);
        container.innerHTML = '<p>Error al cargar los shows.</p>';
    }
};

function createShowCard (show) {
    const card = document.createElement('div'); // Creamos un div para la tarjeta
    card.classList.add('show-card'); // Añadimos la clase 'show-card' al div

    // Creamos el contenido de la tarjeta
    card.innerHTML = `
        <a href="details.html?id=${show.id}">
        <img src="${show.image?.medium || 'img/default.jpg'}" alt="${show.name}">
        <h3>${show.name}</h3>
        </a>
        <p><strong>Género:</strong> ${show.genres.join(', ')}</p>
        <p><strong>Rating:</strong> ${show.rating.average || 'N/A'}</p>
`; // Añadimos el contenido HTML a la tarjeta

        container.appendChild(card); // Añadimos la tarjeta al contenedor
}

fetchShows(); // Llamamos a la función para obtener los shows al cargar la página
container.addEventListener('click', (event) => {
    const card = event.target.closest('.show-card'); // Buscamos el elemento más cercano con la clase 'show-card'
    if (card) {
        const showName = card.querySelector('h3').textContent; // Obtenemos el nombre del show
    }
});