import PropTypes from "prop-types"

/**
 * Card components for basic carousel
 *
 * @module PosterCard
 * @param {number} id
 * @param {object} movie
 * @param {boolean} select
 * @param {function} setCurrentMovie
 * @param {function} setMovie
 * @returns {JSX.Element}
 */
function PosterCard({ movie, select, setCurrentMovie, id, setMovie }) {
    return (
        <div
            className={select ? "posterCard posterCard--select" : "posterCard"}
            onClick={() => {
                select ? setMovie(movie) : setCurrentMovie(id)
            }}
        >
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className={select ? "posterCard__image" : "posterCard__image"} alt={movie.title} />
        </div>
    )
}

PosterCard.propTypes = {
    movie: PropTypes.object.isRequired,
    setCurrentMovie: PropTypes.func,
    id: PropTypes.number.isRequired,
    select: PropTypes.bool.isRequired,
    setMovie: PropTypes.func.isRequired,
}

export default PosterCard
