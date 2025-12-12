
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");  


const poster = document.getElementById("movie-poster");
const title = document.getElementById("movie-title");
const plot = document.getElementById("movie-plot");
const genre = document.getElementById("movie-genre");
const actors = document.getElementById("movie-actors");
const ratings = document.getElementById("movie-ratings");
const dvd = document.getElementById("movie-dvd");


function formatDateFR(dateString) {

    if (!dateString || dateString === "N/A") {
        return "Non disponible";
    }

    const date = new Date(dateString);
    if (isNaN(date)) return "Non disponible";

    return date.toLocaleDateString("fr-FR"); 
}



async function loadMovie() {

    // Le lien API pour récupérer toutes les infos du film
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();


    // Image du film
    poster.src = data.Poster !== "N/A"
        ? data.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    // Titre
    title.textContent = data.Title;

    // Grand résumé
    plot.textContent = data.Plot;

    // Genre
    genre.textContent = data.Genre;

    // Acteurs
    actors.textContent = data.Actors;

 
    ratings.textContent = data.imdbRating !== "N/A"
        ? data.imdbRating + "/10"
        : "Non noté";

    // Date DVD en français (bonus)
    dvd.textContent = formatDateFR(data.DVD);
}

loadMovie();
