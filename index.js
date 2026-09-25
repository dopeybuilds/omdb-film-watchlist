// API key= http://www.omdbapi.com/?apikey=[784ea01]&s=grave+of+the+fireflies

async function searchMovie() {
    const res = await fetch("http://www.omdbapi.com/?apikey=[784ea01]&s=grave+of+the+fireflies")
    const data = await res.json()
    console.log(data)
}
searchMovie()