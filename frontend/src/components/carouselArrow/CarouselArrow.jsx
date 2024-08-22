import PropsTypes from "prop-types";
/**
 * Arrow component for change actual movie
 *
 * @module CarouselArrow
 * @param {boolean} next
 * @param {number} length
 * @param {function} setCurrentMovie
 * @returns {JSX.Element}
 */
function CarouselArrow({ setCurrentMovie, next, length}) {
  return(
    <div
    className={next ? "carouselArrow" : "carouselArrow carouselArrow--next"}
    onClick={() =>
      setCurrentMovie((prev) =>
        next ? (prev === length ? 0 : prev + 1) : (prev ===  0 ? length : prev - 1)
      )
    }
  >
    <svg
      className="carouselArrow__svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4301 5.92999L20.5001 12L14.4301 18.07"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H20.33"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
  )
}

CarouselArrow.propTypes = {
  next: PropsTypes.bool.isRequired,
  length: PropsTypes.number.isRequired,
  setCurrentMovie: PropsTypes.func.isRequired,
};

export default CarouselArrow;
