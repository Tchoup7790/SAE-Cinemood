import express from "express"
import controller from "../controller/excuseController.mjs"
import ExcuseCategory from "../utils/ExcuseCategory.mjs"

const router = express.Router()

// Route to get a random excuse
router.route("/excuse").get(async (req, res) => {
    try {
        // Fetch a random excuse from the external API
        const excuse = await controller.getExcuse()
        // Send the excuse to the client
        res.status(200).send(excuse)
    } catch (error) {
        // Send the error to the client
        res.status(500).send(error.message)
    }
})

// Route to get multiple random excuses
router.route("/excuse/:param").get(async (req, res) => {
    const param = req.params.param
    if (isNaN(param)) {
        res.status(400).send("param is not an Int") //400 : Bad Request
    } else {
        try {
            const excuse = await controller.getNumberOfExcuse(param)
            res.status(200).send(excuse)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    }
})

// Route to get an excuse by ID
router.route("/excuse/id/:id").get(async (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.status(400).send("id is not an Int") //400 : Bad Request
    } else {
        try {
            const excuse = await controller.getExcuseById(id)
            if (excuse == "") {
                res.status(400).send("id not found") //400 : Bad Request
            } else {
                res.status(200).send(excuse)
            }
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    }
})

// Route to get all categories
router.route("/excuse/categories/category/").get(async (req, res) => {
    res.status(200).send({ data: ExcuseCategory })
})

// Route to get excuses by category
router.route("/excuse/category/:category").get(async (req, res) => {
    const category = req.params.category
    if (!isNaN(category)) {
        res.status(400).send("Category is not a string")
    }
    if (!ExcuseCategory.includes(category)) {
        res.status(400).send("Category not found, try without uppercase") //400 : Bad Request
    } else {
        try {
            let excuse = await controller.getExcuseWithSpecificCategory(category)
            res.status(200).send(excuse)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    }
})

// Route to get multiple excuses by category
router.route("/excuse/category/:category/:param").get(async (req, res) => {
    const category = req.params.category
    const param = req.params.param
    if (!isNaN(category)) {
        res.status(400).send("Category is not a string")
    }
    if (isNaN(param)) {
        res.status(400).send("param is not an Int") //400 : Bad Request
    } else if (!ExcuseCategory.includes(category)) {
        res.status(400).send("Category not found, try without uppercase") //400 : Bad Request
    } else {
        try {
            const excuse = await controller.getNumberOfExcuseWithSpecificCategory(category, param)
            res.status(200).send(excuse)
        } catch (error) {
            // Send the error to the client
            res.status(500).send(error.message)
        }
    }
})

export default router
