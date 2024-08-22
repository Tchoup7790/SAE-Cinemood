import express from "express"
import controlleurFilm from "../controller/controller.mjs"

const router = express.Router()

// Router for handling movie-related requests

// Route for getting the first page of popular movies
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie").get(async (req, res) => {
    try {
        const movies = await controlleurFilm.getMoviesFirstPage()
        res.status(200).send(movies)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Route for getting a specific page of popular movies by its ID
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie/id/:id").get(async (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.status(400).send("id is not an Int") //400 : Bad Request
    } else {
        try {
            const movies = await controlleurFilm.getMoviesWithPage(id)
            res.status(200).send(movies)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    }
})

// Route for getting all categories of movies
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie/category").get(async (req, res) => {
    try {
        const movies = await controlleurFilm.getAllCategory()
        res.status(200).send(movies)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Route for getting the most popular movies in a specific category
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie/category/:param").get(async (req, res) => {
    const category = req.params.param
    if (isNaN(category)) {
        try {
            const movies = await controlleurFilm.getMoviesWithCategory(category)
            if (movies == null) return res.status(400).send("Category does not exist")
            res.status(200).send(movies)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    } else return res.status(400).send("Param is not a string")
})

// Route for getting the most popular movie closest to a specific keyword
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie/keyword/:keyword").get(async (req, res) => {
    const keyword = req.params.keyword
    if (isNaN(keyword)) {
        try {
            const movies = await controlleurFilm.getMoviesWithKeyword(keyword)
            res.status(200).send(movies)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    } else return res.status(400).send("Keyword is not a string")
})

// Route for getting the trailer of a movie by its ID
/**
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
router.route("/movie/trailer/:id").get(async (req, res) => {
    const id = req.params.id
    const trailer = await controlleurFilm.getMovieTrailer(id)
    res.status(200).send(trailer)
})

export default router
