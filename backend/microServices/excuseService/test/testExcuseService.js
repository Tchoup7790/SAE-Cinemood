"use strict"
import * as chai from "chai"
let expect = chai.expect
import supertest from "supertest"
import server from "../server.js"
import excuseController from "../src/controller/excuseController.mjs"
const requestWithSupertest = supertest(server)
import axios from "axios"
import sinon from "sinon"

//Utilise l'environnement du serveur (TEST, DEV, PROD)
describe("GET /excuse", function () {
    it("GET /excuse valid test", async () => {
        const response = await requestWithSupertest.get("/excuse")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(excuseController, "getExcuse").throws(new Error("GET EXCUSE ERROR"))

        const response = await requestWithSupertest.get("/excuse")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET EXCUSE ERROR")

        // Restaurer la fonction originale après le test
        excuseController.getExcuse.restore()
    })

    it("GET /excuse Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /excuse/:param valid test", async () => {
        const response = await requestWithSupertest.get("/excuse/3")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse/:param param not a string", async () => {
        const response = await requestWithSupertest.get("/excuse/aaa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("param is not an Int")
    })

    it("GET /excuse/:param API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(excuseController, "getNumberOfExcuse").throws(new Error("GET NUMBER OF EXCUSE ERROR"))

        const response = await requestWithSupertest.get("/excuse/3")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET NUMBER OF EXCUSE ERROR")

        // Restaurer la fonction originale après le test
        excuseController.getNumberOfExcuse.restore()
    })

    it("GET /excuse/:param Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse/5")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /excuse/id/:id valid test", async () => {
        const response = await requestWithSupertest.get("/excuse/id/3")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse/id/:id id not an Int", async () => {
        const response = await requestWithSupertest.get("/excuse/id/aaa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("id is not an Int")
    })

    it("GET /excuse/id/:id id not found", async () => {
        const response = await requestWithSupertest.get("/excuse/id/999999999")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("id not found")
    })

    it("GET /excuse/id/:id API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(excuseController, "getExcuseById").throws(new Error("GET ID ERROR"))

        const response = await requestWithSupertest.get("/excuse/id/3")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET ID ERROR")

        // Restaurer la fonction originale après le test
        excuseController.getExcuseById.restore()
    })

    it("GET /excuse/id/:id Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse/id/5")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /excuse/categories/category valid test", async () => {
        const response = await requestWithSupertest.get("/excuse/categories/category")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse/categories/category Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse/categories/category")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /excuse/category/:category valid test", async () => {
        const response = await requestWithSupertest.get("/excuse/category/family")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse/category/:category Category is not a string", async () => {
        const response = await requestWithSupertest.get("/excuse/category/99")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Category is not a string")
    })

    it("GET /excuse/category/:category Category not found", async () => {
        const response = await requestWithSupertest.get("/excuse/category/aaa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Category not found, try without uppercase")
    })

    it("GET /excuse/category/:category API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(excuseController, "getExcuseWithSpecificCategory").throws(new Error("GET EXCUSE WITH SPECIFIC CATEGORY ERROR"))

        const response = await requestWithSupertest.get("/excuse/category/family")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET EXCUSE WITH SPECIFIC CATEGORY ERROR")

        // Restaurer la fonction originale après le test
        excuseController.getExcuseWithSpecificCategory.restore()
    })

    it("GET /excuse/category/:category Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse/category/family")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })

    it("GET /excuse/category/:category/:param valid test", async () => {
        const response = await requestWithSupertest.get("/excuse/category/family/3")
        expect(response.status).to.eql(200)
    })

    it("GET /excuse/category/:category/:param Category is not a string", async () => {
        const response = await requestWithSupertest.get("/excuse/category/54/3")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Category is not a string")
    })

    it("GET /excuse/category/:category/:param param is not an Int", async () => {
        const response = await requestWithSupertest.get("/excuse/category/family/aa")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("param is not an Int")
    })

    it("GET /excuse/category/:category/:param Category not found", async () => {
        const response = await requestWithSupertest.get("/excuse/category/aaa/5")
        expect(response.status).to.eql(400)
        expect(response.text).to.eql("Category not found, try without uppercase")
    })

    it("GET /excuse/category/:category/:param API Connexion error", async () => {
        // Mocker la fonction getExcuse pour qu'elle lance une erreur
        sinon.stub(excuseController, "getNumberOfExcuseWithSpecificCategory").throws(new Error("GET NUMBER OF EXCUSE WITH SPECIFIC CATEGORY ERROR"))

        const response = await requestWithSupertest.get("/excuse/category/family/3")
        expect(response.status).to.eql(500)
        expect(response.text).to.eql("GET NUMBER OF EXCUSE WITH SPECIFIC CATEGORY ERROR")

        // Restaurer la fonction originale après le test
        excuseController.getNumberOfExcuseWithSpecificCategory.restore()
    })

    it("GET /excuse/category/:category/:param Connection refused", async () => {
        try {
            await axios.get("http://localhost/excuse/category/family/3")
        } catch (error) {
            expect(error.code).to.eql("ECONNREFUSED")
        }
    })
})
