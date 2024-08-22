import PropTypes from "prop-types";

/**
 * Basic card movie for basic Carousel on home page
 * 
 * @module BasicCard
 * @param {object} movie
 * @returns {JSX.Element}
 */
function BasicCard({movie}){
    return(
        <div className="basicCard">
            <img className="basicCard__poster" src={movie.poster} alt="movie poster"/>
        </div>
    )
}

BasicCard.propTypes = {
    movie: PropTypes.object.isRequired
}

export default BasicCard;