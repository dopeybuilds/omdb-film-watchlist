const apiKey = "784ea01"

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
        console.log("error")
        return
    }

    
    const ids = data.Search.map(movie => movie.imdbID)
    console.log(ids)
}

async function getMovieDetails(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    const data = await res.json()
    return data
}