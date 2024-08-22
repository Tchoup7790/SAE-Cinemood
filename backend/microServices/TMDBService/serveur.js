import express from "express"
import router from "./src/router/router.mjs"

const app = express()

app.use(router)

app.listen(8090, () => {
    console.log("Server on")
})

export default app
