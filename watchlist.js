
const myWatchlist = document.getElementById('watchlist');
let watchList = []




document.querySelector('main').addEventListener('click', (e) => {
    const button = e.target.closest(".remove-watchlist")
    if (button == null) {

    } else {
    const id = button.dataset.id
        let watchlist = getWatchlist()
        let updatedWatchlist = watchlist.filter((watch) => watch.imdbID !== id)
        saveWatchlist(updatedWatchlist)
        renderWatchlist()
    }
})






function renderWatchlist() {
    getWatchlist()
    if (getWatchlist().length === 0) {
        myWatchlist.innerHTML = `<p class="empty-placeholder">Your watchlist is looking a little empty <a href="index.html" class="add-movies">Let's add some movies</a></p>`
    } else {
        const watchlist = getWatchlist();
        myWatchlist.innerHTML = watchlist.map(movie => `
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
                    <button class="remove-watchlist" data-id="${movie.imdbID}">
                        <img src="./images/remove.svg" alt="">
                        Watchlist
                    </button>
                </div>
                <p class="movie-plot">${movie.Plot}</p>
            </div>
        </div>
    `).join("")
    }
}

renderWatchlist();