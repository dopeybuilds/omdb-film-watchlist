const apiKey = "784ea01"


document.getElementById("search-form").addEventListener("submit", event => {
    event.preventDefault()
    const search = event.target.search.value
    const searchText = search.trim()
    if (searchText === "") {}
})







async function searchMovie(searchText) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURICpomponent(searchText)}`)
    const data = await res.json()
    if (data.res === "False") {
        console.log("error")
    }
    
    console.log(data)
}
