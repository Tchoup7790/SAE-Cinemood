"use strict"
import * as chai from "chai"
let expect = chai.expect
let assert = chai.assert
import supertest from "supertest"
import server from "../server.js"
import weatherController from "../src/controller/weatherController.mjs"
const requestWithSupertest = supertest(server)
import axios from "axios"
import sinon from "sinon"
import { c } from "sinon/lib/sinon/spy-formatters.js"

//Utilise l'environnement du serveur (TEST, DEV, PROD)
describe("GET /weather", function () {
    const latitude = 39.9075
    const longitude = 116.39723

    it("GET /weather valid test latitude", async () => {
        const response = await requestWithSupertest.get("/weather").set("latitude", latitude)
        const text = JSON.parse(response.res.text)
        const city = text.city
        expect(response.status).to.eql(200)
        expect(city).to.eql("Nantes")
    })

    it("GET /weather valid test longitude", async () => {
        const response = await requestWithSupertest.get("/weather").set("longitude", longitude)
        const text = JSON.parse(response.res.text)
        const city = text.city
        expect(response.status).to.eql(200)
        expect(city).to.eql("Nantes")
    })

    it("GET /weather valid test latitude and longitude", async () => {
        const response = await requestWithSupertest.get("/weather").set("latitude", latitude).set("longitude", longitude)
        const text = JSON.parse(response.res.text)
        const city = text.city
        expect(response.status).to.eql(200)
        expect(city).to.eql("Beijing")
    })

    it("GET /weather API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(weatherController, "getWeatherData").throws(new Error("GET WEATHER DATA ERROR"))

        const response = await requestWithSupertest.get("/weather")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET WEATHER DATA ERROR")

        // Restaurer la fonction originale après le test
        weatherController.getWeatherData.restore()
    })

    it("GET /weather Connection refused", async () => {
        try {
            await axios.get("http://localhost/weather")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /weather/details valid test", async () => {
        const response = await requestWithSupertest.get("/weather/details")
        expect(response.status).to.eql(200)
    })

    it("GET /weather/details API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(weatherController, "getDetailsData").throws(new Error("GET DETAILS DATA ERROR"))

        const response = await requestWithSupertest.get("/weather/details")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET DETAILS DATA ERROR")

        // Restaurer la fonction originale après le test
        weatherController.getDetailsData.restore()
    })

    it("GET /weather/details Connection refused", async () => {
        try {
            await axios.get("http://localhost/weather/details")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /weather/temperature valid test", async () => {
        const response = await requestWithSupertest.get("/weather/temperature")
        expect(response.status).to.eql(200)
    })

    it("GET /weather/temperature API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(weatherController, "getTempData").throws(new Error("GET TEMPERATURE DATA ERROR"))

        const response = await requestWithSupertest.get("/weather/temperature")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET TEMPERATURE DATA ERROR")

        // Restaurer la fonction originale après le test
        weatherController.getTempData.restore()
    })

    it("GET /weather/temperature Connection refused", async () => {
        try {
            await axios.get("http://localhost/weather/temperature")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })
})
