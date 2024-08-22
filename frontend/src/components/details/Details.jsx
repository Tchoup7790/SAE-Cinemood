import icons from "../../assets/img/weatherIconsSvg"
import { useState, useEffect } from "react"
import WeatherDao from "../../data/WeatherDao"
import { useGeolocated } from "react-geolocated"
import PropsTypes from "prop-types"

/**
 * DayData component for the header
 *
 * @module Details
 * @param {function} setWeatherCode
 * @returns {React.Element} DayData component
 */
function Details({ setWeatherCode }) {
    const [stateCoords, setStateCoords] = useState({ longitude: null, latitude: null })
    const [weatherData, setWeatherData] = useState({
        description: "API error, Weather on clear sky",
        icon_name: "01d",
        city: "city",
    })
    const [temperature, setTemperature] = useState({
        temperature: "0.0",
    })

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated()

    // Set weather code by the icon
    useEffect(() => {
        setWeatherCode(weatherData.icon_name[0] + weatherData.icon_name[1])

        if (isGeolocationAvailable && isGeolocationEnabled && coords) {
            if (coords !== stateCoords) {
                WeatherDao.getWeatherAtLocation(coords.longitude, coords.latitude).then((data) => {
                    setWeatherData(data)
                })
                WeatherDao.getTemperatureAtLocation(coords.longitude, coords.latitude).then((data) => {
                    setTemperature(data)
                })
                setStateCoords(coords)
            }
        } else {
            WeatherDao.getWeatherAtLocation(null, null).then((data) => {
                setWeatherData(data)
            })
            WeatherDao.getTemperatureAtLocation(null, null).then((data) => {
                setTemperature(data)
            })
            setStateCoords(coords)
        }
    }, [setWeatherCode, weatherData.icon_name, coords, isGeolocationAvailable, isGeolocationEnabled, stateCoords])

    return (
        <div className="headerDetails">
            <div className="headerDetails__weather">
                <p className="headerDetails__weather__text">{weatherData.description}</p>
                <article className="headerDetails__weather__description">
                    <p className="headerDetails__weather__description__temperature">{Math.round(temperature.temperature)}°</p>
                    <svg
                        className="headerDetails__weather__description__svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{
                            __html: icons[weatherData.icon_name],
                        }}
                    ></svg>
                </article>
            </div>
            <div className="headerDetails__location">
                <p className="headerDetails__location__city">{weatherData.city}</p>
            </div>
        </div>
    )
}

Details.propTypes = {
    setWeatherCode: PropsTypes.func.isRequired,
}

export default Details
