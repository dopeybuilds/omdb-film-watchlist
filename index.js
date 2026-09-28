const apiKey = "784ea01"
const results = document.getElementById("results")

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
        console.log("This is an error")
        return
    }


    const detailPromises = data.Search.map(movie => getMovieDetails(movie.imdbID))
    const movies = await Promise.all(detailPromises)
    renderMovies(movies)
    console.log(movies)
}

async function getMovieDetails(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    const data = await res.json()
    return data
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