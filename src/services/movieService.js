import http from './httpService';
import { apiUrl } from '../config.json'



export function getMovies() {
    return http.get(apiUrl + "movies");
}

export function saveMovie(movies) {
    if (movies._id) {
        const body = { ...movies };
        delete body._id;
        return http.put(apiUrl(movies._id), body);
    }

    return http.get(apiUrl + "movies");
}

    // export function getMovies(movieId) {
    //     return http.get(apiUrl + '/' + movieId);
    // }