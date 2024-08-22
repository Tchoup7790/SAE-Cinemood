import axios from "axios"
import countries from "../utils/LocationCountryCode.mjs"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

// @const {Object} loactionController - Handle location Api
const loactionController = {
    /**
     * Get several cities named Nantes
     *
     * @function getLocation
     * @returns {Promise<[]object>}
     */
    getLocation: async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=Nantes&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
            const data = response.data
            const cities = data.map((city) => {
                return {
                    name: city.name,
                    lon: city.lon,
                    lat: city.lat,
                    country: countries[city.country] ?? city.country,
                    state: city.state ?? "Unknown", // or city.state || "Unknown"
                }
            })
            return cities
        } catch (error) {
            throw new Error("GET LOCATION ERROR")
        }
    },

    /**
     * Get several cities whose name is the parameter
     *
     * @function getSearchingCity
     * @param {string} city
     * @returns {Promise<[]object>}
     */
    getSearchingCity: async (city) => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
            const data = response.data
            const cities = data.map((city) => {
                return {
                    name: city.name,
                    lon: city.lon,
                    lat: city.lat,
                    country: countries[city.country] ?? city.country,
                    state: city.state ?? "Unknown", // or city.state || "Unknown"
                }
            })
            return cities
        } catch (error) {
            throw new Error("GET SEARCHING LOCATION ERROR")
        }
    },

    /**
     * Get city by longitude and latitude
     *
     * @function getLocationByLonLat
     * @param {number} lon
     * @param {number} lat
     * @returns {Promise<object>}
     */
    getLocationByLonLat: async (lon, lat) => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lon=${lon}&lat=${lat}&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
            const data = response.data[0]
            return {
                name: data.name,
                lon: data.lon,
                lat: data.lat,
                country: countries[data.country] ?? data.country,
                state: data.state ?? "Unknown", // or city.state || "Unknown"
            }
        } catch (error) {
            throw new Error("GET SEARCHING CITY ERROR")
        }
    },
}

export default loactionController
