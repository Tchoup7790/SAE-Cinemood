import "./style.scss"

import Header from "./layout/header/Header.jsx"
import Home from "./pages/home/Home.jsx"
import Movie from "./pages/movie/Movie.jsx"

import { useState } from "react"

function App() {
    const [movie, setMovie] = useState(null)
    const [weatherCode, setWeatherCode] = useState(null)
    return (
        <>
            <Header
                setMovie={setMovie}
                setWeatherCode={setWeatherCode}
            />
            {movie ? (
                <Movie movie={movie} />
            ) : (
                <Home
                    weatherCode={weatherCode}
                    setMovie={setMovie}
                />
            )}
        </>
    )
}

export default App
