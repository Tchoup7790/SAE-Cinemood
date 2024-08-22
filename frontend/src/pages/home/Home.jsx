import MainCarousel from "../../layout/mainCarousel/MainCarousel"
import PosterCarousel from "../../layout/posterCarousel/PosterCarousel"
import categoryByWeatherId from "../../utils/categoryByWeatherId"
import { useEffect, useState } from "react"
import MovieDao from "../../data/MovieDao"
import PropTypes from "prop-types"

/**
 * home page
 *
 * @module home
 * @param {function} setMovie
 * @param {string} weatherCode
 * @returns {JSX.Element}
 */
function Home({ setMovie, weatherCode }) {
    const actualCategories = categoryByWeatherId[weatherCode]

    const [categories, setCategories] = useState(null)
    const [categoryOneMovies, setCategoryOneMovies] = useState([])
    const [categoryTwoMovies, setCategoryTwoMovies] = useState([])
    const [categoryThreeMovies, setCategoryThreeMovies] = useState([])
    useEffect(() => {
        if (actualCategories && actualCategories !== categories) {
            MovieDao.getByCategory(actualCategories[0]).then((movies) => {
                setCategoryOneMovies(movies.slice(0, 9))
            })
            MovieDao.getByCategory(actualCategories[1]).then((movies) => {
                setCategoryTwoMovies(movies.slice(0, 9))
            })
            MovieDao.getByCategory(actualCategories[2]).then((movies) => {
                setCategoryThreeMovies(movies.slice(0, 9))
            })
            setCategories(actualCategories)
        }
    }, [actualCategories, setCategoryOneMovies, setCategoryTwoMovies, setCategoryThreeMovies, categoryOneMovies, categories])
    return actualCategories ? (
        <main className="home page">
            <MainCarousel setMovie={setMovie} movies={[categoryOneMovies.slice(0, 4), categoryTwoMovies.slice(0, 4), categoryThreeMovies.slice(0, 1)].flat()} />
            <div className="home__categories">
                <h3 className="home__categories__title">Finds through suggested categories</h3>
                <PosterCarousel setMovie={setMovie} category={actualCategories[0]} movies={categoryOneMovies} />
                <PosterCarousel setMovie={setMovie} category={actualCategories[1]} movies={categoryTwoMovies} />
                <PosterCarousel setMovie={setMovie} category={actualCategories[2]} movies={categoryThreeMovies} />
            </div>
        </main>
    ) : null
}

Home.propTypes = {
    setMovie: PropTypes.func.isRequired,
    weatherCode: PropTypes.string,
}

export default Home
