import axios from "axios"

/**
 * ExcuseController - Handle Excuser Api
 * @const {Object} excuseController
 */

/**
 * Get random excuse from Excuser API
 * @function getExcuse
 * @returns {Promise<string>}
 */
const excuseController = {
    getExcuse: async () => {
        try {
            const response = await axios.get("https://excuser-three.vercel.app/v1/excuse")
            const excuses = response.data
            return excuses
        } catch (error) {
            return Promise.reject(new Error("GET EXCUSE ERROR"))
        }
    },

    /**
     * Get excuse by ID
     * @function getExcuseById
     * @param {number} id
     * @returns {Promise<string>}
     */
    getExcuseById: async (id) => {
        try {
            const response = await axios.get(`https://excuser-three.vercel.app/v1/excuse/id/${id}`)
            const excusedata = response.data
            return excusedata
        } catch (error) {
            return Promise.reject(new Error(`GET ID ERROR`))
        }
    },

    /**
     * Get many excuse
     * @function getNumberOfExcuse
     * @param {number} param
     * @returns {Promise<[]string>}
     */
    getNumberOfExcuse: async (param) => {
        try {
            const response = await axios.get(`https://excuser-three.vercel.app/v1/excuse/${param}`)
            const excusesData = response.data
            return excusesData.map((excuseData) => excuseData.excuse)
        } catch (error) {
            return Promise.reject(new Error(`GET NUMBER OF EXCUSE ERROR`))
        }
    },

    /**
     * Get excuse by specific category
     * @function getExcuseWithSpecificCategory
     * @param {string} category
     * @returns {Promise<string>}
     */
    getExcuseWithSpecificCategory: async (category) => {
        try {
            const response = await axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}`)
            const excusedata = response.data
            return excusedata
        } catch (error) {
            return Promise.reject(new Error(`GET EXCUSE WITH SPECIFIC CATEGORY ERROR`))
        }
    },

    /**
     * Get many excuse by specific category
     * @function getNumberOfExcuseWithSpecificCategory
     * @param {string} category
     * @param {number} param
     * @returns {Promise<[]string>}
     */
    getNumberOfExcuseWithSpecificCategory: async (category, param) => {
        try {
            const response = await axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}/${param}`)
            const excusesData = response.data
            return excusesData.map((excuseData) => excuseData.excuse)
        } catch (error) {
            return Promise.reject(new Error(`GET NUMBER OF EXCUSE WITH SPECIFIC CATEGORY ERROR`))
        }
    },
}

export default excuseController
