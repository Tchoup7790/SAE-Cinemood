/**
 * WeatherDao class responsible for handling weather-related data operations
 *
 * @class WeatherDao
 */
class WeatherDao {
    /**
     * Retrieves weather information for a specific location using longitude and latitude
     *
     * @param {number} longitude The longitude of the location
     * @param {number} latitude The latitude of the location
     * @returns {Promise<object>} A promise that resolves to an object containing weather data
     */
    async getWeatherAtLocation(longitude, latitude) {
        try {
            const header = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            if (longitude && latitude) {
                header.headers.longitude = longitude
                header.headers.latitude = latitude
            }
            const response = await fetch(`http://localhost:8000/weather/`, header)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log("weather backup load")
            console.error("Error waetherDAo getWeatherAtLocation :", error)
            return {
                description: "API error, Weather on clear sky",
                icon_name: "01d",
                city: "city",
            }
        }
    }

    /**
     * Retrieves temperature information for a specific location using longitude and latitude
     *
     * @param {number} longitude The longitude of the location
     * @param {number} latitude The latitude of the location
     * @returns {Promise<object>} A promise that resolves to an object containing temperature data
     */
    async getTemperatureAtLocation(longitude, latitude) {
        try {
            const header = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            if (longitude && latitude) {
                header.headers.longitude = longitude
                header.headers.latitude = latitude
            }
            const response = await fetch(`http://localhost:8000/weather/temperature`, header)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log("weather backup load")
            console.error("Error waetherDAo getTemperatureAtLocation :", error)
            return {
                temperature: "0.0",
            }
        }
    }
}

export default new WeatherDao()
