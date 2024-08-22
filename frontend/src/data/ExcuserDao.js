/**
 * DAO class for the Excuser entity.
 *
 * @class ExcuserDao
 */
class ExcuserDao {
    /**
     * Retrieves an excuse from the server based on the provided category.
     *
     * @param {string} category - The category of the excuse to retrieve.
     * @return {Promise<Object>} A promise that resolves to an object containing the excuse.
     */
    async getByCategory(category) {
        try {
            const response = await fetch(`http://localhost:8000/excuse/category/${category}`)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data[0]
        } catch (error) {
            console.log("fake excuse load")
            console.error("Error excuserDao getByCategory :", error)
            return { excuse: "Excuse me, my apology generator didn't work anymore" }
        }
    }

    /**
     * Retrieves a random excuse from the server.
     *
     * @return {Promise<Object>} A promise that resolves to an object containing the excuse.
     */
    async getRandom() {
        try {
            const response = await fetch("http://localhost:8000/excuse/")
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            return data[0]
        } catch (error) {
            console.log("fake excuse load")
            console.error("Error excuserDao getRandom :", error)
            return { excuse: "Excuse me, my apology generator didn't work anymore" }
        }
    }

    /**
     * Retrieves a list of available categories from the server.
     *
     * @return {Promise<Array<string>>} A promise that resolves to an array of category strings.
     */
    async getCategories() {
        try {
            const response = await fetch("http://localhost:8000/excuse/categories/category/")
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const resp = await response.json()
            return resp.data
        } catch (error) {
            console.log("fake category load")
            console.error("Error excuserDao getCategories :", error)
            return ["default"]
        }
    }
}

/**
 * Exports an instance of the ExcuserDao class.
 */
export default new ExcuserDao()
