import http from './httpService';

async function getGenres() {
    const { data } = await http.get("/genres");
    return data;
}

export {
    getGenres
}