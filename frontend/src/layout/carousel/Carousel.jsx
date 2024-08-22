import PropTypes from "prop-types";
// import { useState } from "react";
import movies from "../../utils/movieData.json";
import BasicCard from "../../components/basicCard/BasicCard";
/**
 * Basic carousel for categories on home page
 * 
 * @module Carousel
 * @param {string} category
 * @returns {JSX.Element}
 */
function Carousel({category}){ 
    // const [actualMovie, setActualMovie] = useState(0);
    return(
        <div className="basicCarousel">
            <h4 className="basicCarousel__title">{category}</h4>
            <div className="basicCarousel__movies">
                {
                    movies.map((movie, index) => (
                        <BasicCard movie={movie} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

Carousel.propTypes = {
    category: PropTypes.string.isRequired
}

export default Carousel;