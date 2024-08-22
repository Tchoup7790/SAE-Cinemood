import axios from "axios"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

/**
 * WeatherController module - Handles weather API requests and responses
 */
const weatherController = {
    /**
     * Fetches data from the weather API for testing purposes
     *
     * @function getData
     * @param {number} lat - Latitude of the location
     * @param {number} lon - Longitude of the location
     * @returns {Promise<object>} - A promise that resolves to the API response data
     */
    getData: async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
            )
            return response.data
        } catch (error) {
            return Promise.reject(new Error("GET DATA ERROR"))
        }
    },

    /**
     * Retrieves basic weather data from the API
     *
     * @function getWeatherData
     * @param {number} lat - Latitude of the location
     * @param {number} lon - Longitude of the location
     * @returns {Promise<object>} - A promise that resolves to an object containing weather data
     */
    getWeatherData: async (lat, lon) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
            const data = response.data.weather[0]
            const city = response.data.name
            return {
                title: data.main,
                description: data.description,
                icon_name: data.icon,
                city: city,
            }
        } catch (error) {
            return Promise.reject(new Error("GET WEATHER DATA ERROR"))
        }
    },

    /**
     * Retrieves detailed weather data from the API
     *
     * @function getDetailsData
     * @param {number} lat - Latitude of the location
     * @param {number} lon - Longitude of the location
     * @returns {Promise<object>} - A promise that resolves to an object containing detailed weather data
     */
    getDetailsData: async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
            )
            const data = response.data
            return {
                wind: data.wind,
                cloudiness: data.clouds.all,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            }
        } catch (error) {
            return Promise.reject(new Error("GET DETAILS DATA ERROR"))
        }
    },

    /**
     * Retrieves temperature data from the API
     *
     * @function getTempData
     * @param {number} lat - Latitude of the location
     * @param {number} lon - Longitude of the location
     * @returns {Promise<object>} - A promise that resolves to an object containing temperature data
     */
    getTempData: async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
            )
            const data = response.data
            return {
                temperature: data.main.temp,
                temperature_min: data.main.temp_min,
                temperature_max: data.main.temp_max,
                feels_like: data.main.feels_like,
            }
        } catch (error) {
            return Promise.reject(new Error("GET TEMPERATURE DATA ERROR"))
        }
    },
}

export default weatherController
