// Je récupère les éléments du HTML
const input = document.getElementById("search-input");          
const results = document.getElementById("search-results");      
const loadMoreBtn = document.getElementById("load-more-search"); 


// Le texte tapé par l'utilisateur
let query = "";

// Le numéro de page (1 = première page)
let page = 1;




function displayMovies(movieList) {

    movieList.forEach(film => {

        // Si le film n’a pas d’image → on met une image par défaut
        const poster = film.Poster !== "N/A"
            ? film.Poster
            : "https://via.placeholder.com/150x220?text=No+Image";

        // On crée une carte pour un film
        const card = document.createElement("div");
        card.classList.add("movie-card");

        // Ce qu'il y a dans la carte
        card.innerHTML = `
            <img src="${poster}" alt="${film.Title}">
            <h3>${film.Title}</h3>
            <a href="movie.html?id=${film.imdbID}">Voir détails</a>
        `;

        // On ajoute la carte dans la page
        results.appendChild(card);
    });
}


async function searchMovies(reset = false) {

    // Si la personne a tapé moins de 3 lettres 
    if (query.length < 3) {
        results.innerHTML = "";
        return;
    }

    // Lien de l’API avec le texte tapé + la page
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;

    // On appelle l’API
    const response = await fetch(url);
    const data = await response.json();

    // Si reset = true → nouvelle recherche → on efface l'ancienne
    if (reset) {
        results.innerHTML = "";
    }

    // Si aucun film trouvé
    if (!data.Search) {
        results.innerHTML = "<p>Aucun film trouvé.</p>";
        return;
    }

    // On affiche les films trouvés
    displayMovies(data.Search);
}





input.addEventListener("input", () => {

    query = input.value.trim(); // On récupère ce qu'elle écrit
    page = 1;                   // Nouvelle recherche → retour page 1

    searchMovies(true);         // On efface les anciens films et on cherche
});





loadMoreBtn.addEventListener("click", () => {

    page++;                  // On passe à la page suivante
    searchMovies(false);     // On ajoute les films sans effacer
});
