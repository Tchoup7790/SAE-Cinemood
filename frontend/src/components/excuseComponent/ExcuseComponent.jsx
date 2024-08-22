import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ExcuserDao from "../../data/ExcuserDao"
/**
 * Excuse Component
 *
 * @module ExcuseComponent
 * @returns {JSX.Element}
 */
function ExcuseComponent() {
    const [showExcuse, setShowExcuse] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        ExcuserDao.getCategories().then((data) => setCategories(data))
        const selectElement = document.getElementById("excuse")

        const loadExcuse = async (category) => {
            category === "whatever" ? setShowExcuse(await ExcuserDao.getRandom()) : setShowExcuse(await ExcuserDao.getByCategory(category))
        }

        const handleSelectChange = (e) => {
            e.preventDefault()
            loadExcuse(selectElement.value)
        }

        selectElement.addEventListener("change", handleSelectChange)

        return () => {
            selectElement.removeEventListener("change", handleSelectChange)
            setShowExcuse("")
        }
    }, [])

    return (
        <motion.div className="excuse" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}>
            <label className="excuse__label">
                I need an excuse to cancel my appointment of / with
                <select className="excuse__label__select" name="excuse" id="excuse">
                    <option value="whatever">whatever</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            <p className="excuse__result">{showExcuse.excuse}</p>
        </motion.div>
    )
}

export default ExcuseComponent
