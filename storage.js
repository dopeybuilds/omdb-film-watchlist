function getWatchlist() {
    const saved = localStorage.getItem('watchlist')
    return JSON.parse(saved) || []
}
