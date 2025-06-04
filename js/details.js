const container = document.getElementById('detalle-container');// Contenedor para los detalles del show
const params = new URLSearchParams(window.location.search);// Obtener los parámetros de la URL
const id = params.get('id');

async function fetchShowDetail(id) { // Función para obtener los detalles del show
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`); // Hacer una solicitud a la API para obtener los detalles del show
    const episodes = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`); // Hacer una solicitud a la API para obtener los episodios del show
    // Si la respuesta es exitosa, mostrar los detalles del show y sus episodios
    const show = response.data;
    const episodeList = episodes.data;
    // Renderizar los detalles del show en el contenedor
    container.innerHTML = `
      <h1>${show.name}</h1>
      <img src="${show.image?.original || 'img/default.jpg'}" alt="${show.name}">
      <p>${show.summary}</p>
      <h2>Episodios (${episodeList.length})</h2>
      <ul>
        ${episodeList.map(ep => `<li>${ep.season}x${ep.number} - ${ep.name}</li>`).join('')}
      </ul>
      <a href="index.html">← Volver al inicio</a>
    `;
  } catch (err) { // Manejar errores en la solicitud
    console.error('Error cargando detalles:', err);
    container.innerHTML = '<p>Error cargando detalles del show.</p>';
  }
}

fetchShowDetail(id); // Llamar a la función para obtener los detalles del show al cargar la página