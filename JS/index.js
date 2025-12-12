

// On récupère les éléments HTML
const moviesContainer = document.getElementById("movies");
const loadMoreBtn = document.getElementById("load-more");

let page = 1;

async function loadMovies() {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers&page=${page}`
    );

    const data = await response.json();
    console.log("Résultats API :", data);

    if (!data.Search) {
        return;
    }

    data.Search.forEach(film => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${film.Poster}" alt="${film.Title}">
            <h3>${film.Title}</h3>
            <a href="movie.html?id=${film.imdbID}">Voir détails</a>
        `;

        moviesContainer.appendChild(card);
    });
}

// première page   Affichage
loadMovies();

// Charger les autres pages automatiquement 
loadMoreBtn.addEventListener("click", () => {
    page++;       
    loadMovies(); 
});
