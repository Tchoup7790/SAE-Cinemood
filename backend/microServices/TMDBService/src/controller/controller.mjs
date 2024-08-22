import axios from "axios"
import categories from "../Model/Category.js"

const APIkey = ""

/**
 * @const {Object} controllerMovies - Handle movie API requests and responses.
 */
const controllerMovies = {
    /**
     * @function getMoviesFirstPage
     * @returns {Promise<Array>} - A promise that resolves to an array of movie objects from the first page.
     * @description Fetches the first page of popular movies from the API.
     */
    getMoviesFirstPage: async () => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`)
            return data.data.results
        } catch (error) {
            return Promise.reject(new Error("GET MOVIE ERROR"))
        }
    },

    /**
     * @function getMoviesWithPage
     * @param {number} id - The page number to fetch.
     * @returns {Promise<Array>} - A promise that resolves to an array of movie objects from the specified page.
     * @description Fetches a specific page of popular movies from the API.
     */
    getMoviesWithPage: async (id) => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=${id}`)
            return data.data.results
        } catch (error) {
            return Promise.reject(new Error("GET MOVIE ID ERROR"))
        }
    },

    /**
     * @function getAllCategory
     * @returns {Promise<Array>} - A promise that resolves to an array of movie genre objects.
     * @description Fetches all available movie genres from the API.
     */
    getAllCategory: async () => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}&language=en-US`)
            return data.data.genres
        } catch (error) {
            return Promise.reject(new Error("GET MOVIE CATEGORIES ERROR"))
        }
    },

    /**
     * @function getMoviesWithCategory
     * @param {string} category - The movie genre to filter by.
     * @returns {Promise<Object>} - A promise that resolves to an object containing movies of the specified genre.
     * @description Fetches movies of a specific genre from the API.
     */
    getMoviesWithCategory: async (category) => {
        var id = 0
        for (var key in categories) {
            if (category == key) {
                id = categories[key]
            }
        }
        if (id == 0) return null
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=${id}&language=en-US`)
            return data.data
        } catch (error) {
            return Promise.reject(new Error("GET MOVIE WITH CATEGORY ERROR"))
        }
    },

    /**
     * @function getMoviesWithKeyword
     * @param {string} keyword - The keyword to search for in movie titles.
     * @returns {Promise<Array>} - A promise that resolves to an array of movie objects matching the keyword.
     * @description Searches for movies with a specific keyword in their titles.
     */
    getMoviesWithKeyword: async (keyword) => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${keyword}&language=en-US`)
            return data.data.results
        } catch (error) {
            return Promise.reject(new Error("GET MOVIE WITH KEYWORD ERROR"))
        }
    },

    /**
     * @function getMovieTrailer
     * @param {number} id - The movie ID to fetch the trailer for.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the movie trailer information.
     * @description Fetches the trailer for a specific movie from the API.
     */
    getMovieTrailer: async (id) => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIkey}`)
            return data.data.results[0]
        } catch (error) {
            throw new error()
        }
    },
}

export default controllerMovies
