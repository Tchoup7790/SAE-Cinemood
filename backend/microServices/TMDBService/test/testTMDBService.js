"use strict"
import * as chai from "chai"
let expect = chai.expect
import supertest from "supertest"
import server from "../serveur.js"
import movieController from "../src/controller/controller.mjs"
const requestWithSupertest = supertest(server)
import axios from "axios"
import sinon from "sinon"

//Utilise l'environnement du serveur (TEST, DEV, PROD)
describe("GET /movie", function () {
    it("GET /movie valid test", async () => {
        const response = await requestWithSupertest.get("/movie")
        expect(response.status).to.eql(200)
    })

    it("GET /movie API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(movieController, "getMoviesFirstPage").throws(new Error("GET MOVIE ERROR"))

        const response = await requestWithSupertest.get("/movie")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE ERROR")

        // Restaurer la fonction originale après le test
        movieController.getMoviesFirstPage.restore()
    })

    it("GET /movie Connection refused", async () => {
        try {
            await axios.get("http://localhost/movie")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /movie/id/:id valid test", async () => {
        const response = await requestWithSupertest.get("/movie/id/2")
        expect(response.status).to.eql(200)
    })

    it("GET /movie/id/:id id is not an int test", async () => {
        const response = await requestWithSupertest.get("/movie/id/aaa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("id is not an Int")
    })

    it("GET /movie/id/:id id does not correspond to a page", async () => {
        const response = await requestWithSupertest.get("/movie/id/999999999999999999999999999999999")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE ID ERROR")
    })

    it("GET /movie/id/:id API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(movieController, "getMoviesWithPage").throws(new Error("GET MOVIE ID ERROR"))

        const response = await requestWithSupertest.get("/movie/id/2")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE ID ERROR")

        // Restaurer la fonction originale après le test
        movieController.getMoviesWithPage.restore()
    })

    it("GET /movie/id/:id Connection refused", async () => {
        try {
            await axios.get("http://localhost/movie/id/2")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /movie/category valid test", async () => {
        const response = await requestWithSupertest.get("/movie/category")
        expect(response.status).to.eql(200)
    })

    it("GET /movie/category API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(movieController, "getAllCategory").throws(new Error("GET MOVIE CATEGORIES ERROR"))

        const response = await requestWithSupertest.get("/movie/category")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE CATEGORIES ERROR")

        // Restaurer la fonction originale après le test
        movieController.getAllCategory.restore()
    })

    it("GET /movie/category Connection refused", async () => {
        try {
            await axios.get("http://localhost/movie/category")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /movie/category/:param valid test", async () => {
        const response = await requestWithSupertest.get("/movie/category/Action")
        expect(response.status).to.eql(200)
    })

    it("GET /movie/category/:param param is not a string test", async () => {
        const response = await requestWithSupertest.get("/movie/category/55")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Param is not a string")
    })

    it("GET /movie/category/:param param is not a category test", async () => {
        const response = await requestWithSupertest.get("/movie/category/aaa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Category does not exist")
    })

    it("GET /movie/category/:param API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(movieController, "getMoviesWithCategory").throws(new Error("GET MOVIE WITH CATEGORY ERROR"))

        const response = await requestWithSupertest.get("/movie/category/Action")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE WITH CATEGORY ERROR")

        // Restaurer la fonction originale après le test
        movieController.getMoviesWithCategory.restore()
    })

    it("GET /movie/category/:param Connection refused", async () => {
        try {
            await axios.get("http://localhost/movie/category/Action")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /movie/keyword/:keyword valid test", async () => {
        const response = await requestWithSupertest.get("/movie/keyword/car")
        expect(response.status).to.eql(200)
    })

    it("GET /movie/keyword/:keyword keyword is not a string test", async () => {
        const response = await requestWithSupertest.get("/movie/keyword/55")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Keyword is not a string")
    })

    it("GET /movie/keyword/:keyword API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(movieController, "getMoviesWithKeyword").throws(new Error("GET MOVIE WITH KEYWORD ERROR"))

        const response = await requestWithSupertest.get("/movie/keyword/car")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET MOVIE WITH KEYWORD ERROR")

        // Restaurer la fonction originale après le test
        movieController.getMoviesWithKeyword.restore()
    })

    it("GET /movie/keyword/:keyword Connection refused", async () => {
        try {
            await axios.get("http://localhost/movie/keyword/car")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })
})
