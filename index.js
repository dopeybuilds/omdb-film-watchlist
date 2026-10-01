const apiKey = "784ea01"
const results = document.getElementById("results")
let currentMovies = []
const addMovie = document.getElementById("add-watchlist")

renderPlaceholder()
results.addEventListener("click", (e) => {
    const button = e.target.closest(".add-watchlist")
    if (button == null) {
        
    } else {
        const id = button.dataset.id
        const movie = currentMovies.find((movie) => movie.imdbID === id)
        let watchlist = getWatchlist()
        if (watchlist.some((saved) => movie.imdbID === saved.imdbID)) {} 
        else {
            watchlist.push(movie)
            saveWatchlist(watchlist)
            button.disabled = true
            button.innerText = "Added"
        }
    }
})

document.getElementById("search-form").addEventListener("submit", async event => {
    event.preventDefault()
    const searchText = event.target.search.value.trim()
    if (searchText === "") return

    await searchMovie(searchText)
    event.target.reset()
})

async function searchMovie(searchText) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchText)}`)
    const data = await res.json()

    if (data.Response === "False") {
        results.innerHTML = 
            `<p class="empty-placeholder">We can't find that movie!</p>`
        return
    }


    const detailPromises = data.Search.map(movie => getMovieDetails(movie.imdbID))
    const movies = await Promise.all(detailPromises)
    currentMovies = movies
    renderMovies(movies)
    console.log(movies)
}

async function getMovieDetails(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    return await res.json()
}

function renderMovies(movies) {
    results.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img class="poster" src="${movie.Poster}" alt="${movie.Title} poster">
            <div class="movie-info">
                <div class="movie-heading">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <span class="movie-rating">⭐ ${movie.imdbRating}</span>
                </div>
                <div class="movie-meta-data">
                    <span class="runtime">${movie.Runtime}</span>
                    <span class="genre">${movie.Genre}</span>
                    <button class="add-watchlist" data-id="${movie.imdbID}">
                        <img src="./images/add.svg" alt="">
                        Watchlist
                    </button>
                </div>
                <p class="movie-plot">${movie.Plot}</p>
            </div>
        </div>
    `).join("")
}

function renderPlaceholder() {
    results.innerHTML =
        `<div class="empty-placeholder">
            <img src="./images/film.svg" alt="film icon" class="film-icon">
            <p>Start Exploring</p>
        </div>`
}