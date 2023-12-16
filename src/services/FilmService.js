let baseURL = 'https://api.themoviedb.org/3/discover/movie';
let api = '?api_key=5d89a851209c71cb4f159ba0715214e8'
let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

const RESOURCE_LANGUAGE = "&language=fr";

export async function getAllFilms() {
    const response = await fetch(baseURL + api + RESOURCE_LANGUAGE, headers);
    return await response.json();
}

export async function getFilm(id) {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + id + api + RESOURCE_LANGUAGE, headers);
    return await response.json();
}

export async function getAllGenres() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list' + api + RESOURCE_LANGUAGE, headers);
    return await response.json();
}


export async function getMoviesByGenre(genreId) {
    const response = await fetch(baseURL + api + RESOURCE_LANGUAGE + '&with_genres=' + genreId, headers);
    return await response.json();
}
