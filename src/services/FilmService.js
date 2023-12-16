let baseURL = 'https://api.themoviedb.org/3/movie/';
let api = '?api_key=5d89a851209c71cb4f159ba0715214e8'
let headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const RESOURCE_NAME = "popular";

export async function getAllFilms() {
  const response = await fetch(baseURL + RESOURCE_NAME + api, headers);
  return await response.json();
}

export async function getFilm(id) {
    const response = await fetch(baseURL + id + api, headers);
    return await response.json();
  }

