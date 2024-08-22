import { useEffect, useState, useRef } from "react"

import PropsTypes from "prop-types"

import PosterCard from "../../components/posterCard/PosterCard"
import SliderCarousel from "../../components/sliderCarousel/SliderCarousel"
import CarouselArrow from "../../components/carouselArrow/CarouselArrow"

/**
 * Carousel component
 *
 * @module PosterCarousel
 * @param {string} category
 * @param {function} setMovie
 * @param {Array} movies
 * @returns {JSX.Element}
 */
function PosterCarousel({ category, setMovie, movies }) {
    const [currentMovie, setCurrentMovie] = useState(4)
    const length = movies.length - 1
    const carousel = useRef(null)

    if (carousel.current) {
        carousel.current.style.transform = currentMovie === movies.length ? `translateX(0)` : `translateX(-${currentMovie * 19}rem)`
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMovie((prev) => (prev === length ? 0 : prev + 1))
        }, 2000)

        return () => clearTimeout(interval)
    }, [currentMovie, setCurrentMovie, length])

    return (
        <>
            <div className="posterCarousel">
                <h2 className="posterCarousel__title">{category}</h2>
                <div className="posterCarousel__main">
                    <div className="posterCarousel__main__container" ref={carousel}>
                        {movies.map((movie, index) => (
                            <PosterCard key={index} id={index} movie={movie} setMovie={setMovie} select={index === currentMovie} setCurrentMovie={setCurrentMovie} />
                        ))}
                    </div>
                </div>
                <div className="posterCarousel__bottom">
                    <CarouselArrow next={false} setCurrentMovie={setCurrentMovie} length={length} />
                    <SliderCarousel currentMovie={currentMovie} setCurrentMovie={setCurrentMovie} length={movies.length} />
                    <CarouselArrow next={true} setCurrentMovie={setCurrentMovie} length={length} />
                </div>
            </div>
        </>
    )
}

PosterCarousel.propTypes = {
    category: PropsTypes.string,
    setMovie: PropsTypes.func.isRequired,
    movies: PropsTypes.array.isRequired,
}

export default PosterCarousel
