const API_KEY = "1457b4d3-b1f3-4919-9ab4-aa032539f1c1";
const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";


getFilms(API_URL_POPULAR).then(r => r);

async function getFilms(url) {
    const resp = await fetch(url, {
        headers: {
            "Content_Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData.items ? respData.items : respData.films)
    console.log(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green"
    } else if (vote > 5) {
        return "orange"
    } else {
        return "red";
    }
}


function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML = "";
    data.forEach((movie) => {
        moviesEl.insertAdjacentHTML('beforeend',
            `<div class="movie">
                    <div class="movie__cover-inner">
                        <img class="movie_cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}"/>
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <div class="movie__title">${movie.nameRu}</div>
                        <div class="movie__category">${movie.genres.map(
                            (genre) => `  ${genre.genre}`
                            )}</div>
                       <div class="movie__average movie__average--${getClassByRate(movie.ratingKinopoisk || movie.rating)}">${movie.ratingKinopoisk || movie.rating}</div>
                    </div>
                  </div>`)
    });

}


const links = document.querySelectorAll('.film-filter');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.getAttribute('data-type');
        if (!target) return;
        getFilms(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=${target}&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`)

    })
})


const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getFilms(apiSearchUrl);
        search.value = "";
    }
})
