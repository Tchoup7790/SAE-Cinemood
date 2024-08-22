import PropTypes from "prop-types";
/**
 * Dot Slider for carousel
 * 
 * @module SliderCarousel
 * @param {number} currentMovie
 * @param {number} length
 * @param {boolean} abs
 * @param {function} setCurrentMovie
 * @returns {JSX.Element}
 */
function SliderCarousel({ currentMovie, length, setCurrentMovie, abs=false }) {
  return (
    <div className={abs?"dotSlider":"dotSlider--relative"}>
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className={
            index === currentMovie
              ? "dotSlider__dot dotSlider__dot--active"
              : "dotSlider__dot"
          }
          onClick={() => setCurrentMovie(index)}
        ></div>
      ))}
    </div>
  )
}

SliderCarousel.propTypes = {
    currentMovie: PropTypes.number.isRequired,
    length: PropTypes.number,
    abs: PropTypes.bool,
    setCurrentMovie: PropTypes.func,
};

export default SliderCarousel;