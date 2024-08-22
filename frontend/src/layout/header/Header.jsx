import Details from "../../components/details/Details"
// import { useState, useEffect } from 'react';
import logo from "../../assets/img/logo.svg"

import PropsTypes from "prop-types"

/**
 * Header component
 *
 * @module Header
 * @param {function} setMovie
 * @param {function} setWeatherCode
 * @returns {React.Element} Header component
 */
function Header({ setMovie, setWeatherCode }) {
    return (
        <header className={"header"}>
            <div onClick={() => setMovie(null)} className="header__logo">
                <img src={logo} alt="Logo" />
            </div>
            <Details setWeatherCode={setWeatherCode} />
        </header>
    )
}

Header.propTypes = {
    setMovie: PropsTypes.func.isRequired,
    setWeatherCode: PropsTypes.func.isRequired,
}

export default Header
