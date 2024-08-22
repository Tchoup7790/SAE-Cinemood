import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

// import movies from "../../utils/movieData.json"

import MainCard from "../../components/mainCard/MainCard"
import SliderCarousel from "../../components/sliderCarousel/SliderCarousel"
import AssideCard from "../../components/assideCard/AssideCard"

/**
 * MainCarousel component
 *
 * @module MainCarousel
 * @param {function} setMovie
 * @param {Array} movies
 * @returns {JSX.Element}
 */
function MainCarousel({ setMovie, movies }) {
    const [currentMovie, setCurrentMovie] = useState(0)
    const length = movies.length - 1

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovie((prev) => (prev === length ? 0 : prev + 1))
        }, 15000)

        return () => clearTimeout(interval)
    }, [currentMovie, setCurrentMovie, length])

    return (
        <>
            <motion.div className="carousel">
                {movies.map((movie, index) => (
                    <MainCard setMovie={setMovie} key={index} movie={movie} state={index === currentMovie ? "center" : "hidden"} />
                ))}
            </motion.div>
            <AssideCard movie={movies[currentMovie === length ? 0 : currentMovie + 1]} setCurrentMovie={setCurrentMovie} last={currentMovie === length} />
            <SliderCarousel currentMovie={currentMovie} length={length + 1} abs={true} setCurrentMovie={setCurrentMovie} />
        </>
    )
}

MainCarousel.propTypes = {
    setMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
}

export default MainCarousel
