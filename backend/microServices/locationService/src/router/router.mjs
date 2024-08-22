import express from "express"
import controller from "../controller/locationController.mjs"
import middleware from "../middleware/locationMiddleware.mjs"

const router = express.Router()

// Router for location endpoints

// GET /location
// Returns the basic location name
router.route("/location").get(middleware, async (req, res) => {
    const location = await controller.getLocation()
    res.status(200).send(location)
})

// GET /location/:city
// Returns a list of cities with the name given in the parameter
router.route("/location/:city").get(middleware, async (req, res) => {
    const city = req.params.city
    if (isNaN(city)) {
        const cities = await controller.getSearchingCity(city)
        res.status(200).send(cities)
    } else return res.status(400).send("city is not a string")
})

// GET /location/coordinates/:lat/:lon
// Returns the city name based on the given longitude and latitude
router.route("/location/coordinates/:lat/:lon").get(middleware, async (req, res) => {
    const longitude = req.params.lon
    const latitude = req.params.lat
    if (isNaN(longitude) || isNaN(latitude)) return res.status(400).send("longitude or latitude are not strings")
    const city = await controller.getLocationByLonLat(longitude, latitude)
    res.status(200).send(city)
})

export default router
