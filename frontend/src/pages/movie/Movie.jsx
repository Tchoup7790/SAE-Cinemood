import PropsTypes from "prop-types"
import { motion } from "framer-motion"
import { useState } from "react"
import MovieDao from "../../data/MovieDao"
import ExcuseComponent from "../../components/excuseComponent/ExcuseComponent"

/**
 * Movie page
 *
 * @module Movie
 * @param {Object} movie
 * @returns {JSX.Element}
 */
function Movie({ movie }) {
    const [trailer, setTrailer] = useState(null)
    if (!trailer) {
        MovieDao.getTrailerWithId(movie.id).then((data) => {
            setTrailer(data.key)
        })
    }
    return (
        <main className="movie">
            <section className="movie__text">
                <motion.h1 initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
                    {movie.title}
                </motion.h1>
                {/* <motion.h2 initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
                    {movie.director} - {movie.year}
                </motion.h2> */}
                <motion.p initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
                    {movie.overview}
                </motion.p>

                <ExcuseComponent />
            </section>
            <iframe
                className="movie__video"
                src={trailer ? "https://www.youtube.com/embed/" + trailer + "?start=10&mute=1&autoplay=1&loop=1" : ""}
                allow="autoplay;encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
        </main>
    )
}

Movie.propTypes = {
    movie: PropsTypes.object.isRequired,
}

export default Movie
