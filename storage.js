function getWatchlist() {
    const saved = localStorage.getItem('watchlist')
    return JSON.parse(saved) || []
}

function saveWatchlist(list) {
    localStorage.setItem('watchlist', JSON.stringify(list))
}
