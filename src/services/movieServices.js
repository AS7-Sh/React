import http from './httpService';
import config from '../components/config.json';

async function getMovies() {
    let { data } = await http.get("/movies");
    return data;
}

async function deleteMovie(movieId) {
    await http.delete("/movies" + `/${movieId}`);
}

async function getMovie(movieId) {
    try {
        let response = await http.get("/movies" + `/${movieId}`);
        return response.data;
    } catch (ex) {
        return null;
    }
}


async function saveMovie(movie) {
    try {
        let { data } = await getMovie(movie);
        await http.put("/movies", movie);
    } catch (ex) {
        await http.post("/movies", movie)
    }
}

export {
    getMovies,
    deleteMovie,
    getMovie,
    saveMovie,
}