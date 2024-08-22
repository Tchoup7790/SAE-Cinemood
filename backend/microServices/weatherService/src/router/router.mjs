import express from "express"
import controller from "../controller/weatherController.mjs"
import middleware from "../middleware/weatherMiddleware.mjs"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const router = express.Router()

/**
 * Import necessary modules and set up the router for weather-related routes.
 * The middleware checks if the latitude and longitude are correctly declared,
 * otherwise it uses the values for the city of Nantes.
 */

// Get all weather data
// Route: /weather/test
// Method: GET
/**
 * Fetches all weather data for the given latitude and longitude.
 * If the latitude and longitude are not provided, it defaults to the city of Nantes.
 * @returns {Object} The weather data object.
 */
router.route("/weather/test").get(middleware, async (req, res) => {
    try {
        const weather = await controller.getData(req.headers["latitude"], req.headers["longitude"])
        res.status(200).send(weather)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Get basic weather name and description
// Route: /weather/
// Method: GET
/**
 * Fetches the basic weather name and description for the given latitude and longitude.
 * If the latitude and longitude are not provided, it defaults to the city of Nantes.
 * @returns {Object} The weather data object containing the name and description.
 */
router.route("/weather/").get(middleware, async (req, res) => {
    try {
        const weather = await controller.getWeatherData(req.headers["latitude"], req.headers["longitude"])
        res.status(200).send(weather)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Get details information (wind, cloudiness, humidity, pressure)
// Route: /weather/details
// Method: GET
/**
 * Fetches detailed weather information (wind, cloudiness, humidity, pressure) for the given latitude and longitude.
 * If the latitude and longitude are not provided, it defaults to the city of Nantes.
 * @returns {Object} The weather data object containing the details.
 */
router.route("/weather/details").get(middleware, async (req, res) => {
    try {
        const details = await controller.getDetailsData(req.headers["latitude"], req.headers["longitude"])
        res.status(200).send(details)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Get temperature information (temperature, temperature_min, temperature_max, feels_like)
// Route: /weather/temperature
// Method: GET
/**
 * Fetches temperature information (temperature, temperature_min, temperature_max, feels_like) for the given latitude and longitude.
 * If the latitude and longitude are not provided, it defaults to the city of Nantes.
 * @returns {Object} The weather data object containing the temperature information.
 */
router.route("/weather/temperature").get(middleware, async (req, res) => {
    try {
        const details = await controller.getTempData(req.headers["latitude"], req.headers["longitude"])
        res.status(200).send(details)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

export default router
