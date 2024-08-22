import backUpMovie from "../utils/backUpMovies.json"

/**
 * DAO class for the Movie entity.
 *
 * This class contains methods for fetching movie data from a server and
 * returning it in various formats. If the server cannot be reached, the
 * class will return data from a backup JSON file.
 *
 * @class MovieDao
 */
class MovieDao {
    /**
     * Fetches movies by category from the server or the backup file.
     *
     * This method sends a GET request to the server to retrieve movies
     * that match the given category. If the server cannot be reached,
     * the method will return the backup movie data.
     *
     * @param {string} category - The category of movies to fetch.
     * @returns {Array} An array of movie objects that match the category.
     */
    async getByCategory(category) {
        try {
            const response = await fetch(`http://localhost:8000/movie/category/${category}`)
            console.log(response)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data.results
        } catch (error) {
            console.log("movie backup load")
            console.error("Error movieDAO getByCategory :", error)
            return backUpMovie
        }
    }

    /**
     * Fetches a movie page by ID from the server or the backup file.
     *
     * This method sends a GET request to the server to retrieve the movie
     * page that matches the given ID. If the server cannot be reached,
     * the method will return the backup movie data.
     *
     * @param {number} id - The ID of the movie page to fetch.
     * @returns {Object} A movie object that matches the ID.
     */
    async getPageWithId(id) {
        try {
            const response = await fetch(`http://localhost:8000/movie/id/${id}`)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log("movie backup load")
            console.error("Error movieDAO getPageWithId :", error)
            return backUpMovie
        }
    }

    /**
     * Searches for movies with a given keyword from the server or the backup file.
     *
     * This method sends a GET request to the server to retrieve movies
     * that match the given keyword. If the server cannot be reached,
     * the method will return the backup movie data.
     *
     * @param {string} keyword - The keyword to search for in the movie titles.
     * @returns {Array} An array of movie objects that match the keyword.
     */
    async findMovieWithKeyword(keyword) {
        try {
            const response = await fetch(`http://localhost:8000/movie/keyword/${keyword}`)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log("movie backup load")
            console.error("Error movieDAO findMovieWithKeyword :", error)
            return backUpMovie
        }
    }

    /**
     * Fetches the trailer for a movie by ID from the server or the backup file.
     *
     * This method sends a GET request to the server to retrieve the trailer
     * for the movie that matches the given ID. If the server cannot be reached,
     * the method will return the trailer from the backup movie data.
     *
     * @param {number} id - The ID of the movie to fetch the trailer for.
     * @returns {Object} A trailer object that matches the ID.
     */
    async getTrailerWithId(id) {
        try {
            const response = await fetch(`http://localhost:8000/movie/trailer/${id}`)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log("movie backup load")
            console.error("Error movieDAO getTrailerWithId :", error)
            const data = backUpMovie.filter((movie) => movie.id === id).map((movie) => movie.trailer)
            return { key: data[0] }
        }
    }
}

export default new MovieDao()
