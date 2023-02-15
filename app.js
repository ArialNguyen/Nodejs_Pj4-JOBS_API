require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()

// Extra security packages
const helmet = require("helmet")
const xssClean = require('xss-clean')
const cors = require("cors") // 
const rateLimitter = require("express-rate-limit") // limit request to server
// get Connection
const connectDB = require("./db/connect")
// const product = require("./models/products")
const auth_routes = require("./routes/auth")
const jobs_routes = require("./routes/jobs") 
const {authentication } = require("./middleware/auth")
const {errorHandler} = require("./middleware/errorHandler")
// MiddleWare
app.use(express.json())
// app.use(helmet)
// app.use(xssClean)
// app.use(cors)
// app.use(rateLimitter)
// app.use(express.static("./public"))
// routes
app.get("/", (req, res) => {
    res.end("Home Page")
})
app.use("/api/v1/auth", auth_routes)
app.use("/api/v1/jobs",authentication, jobs_routes)

// Not Found
app.use((req, res) =>{
    res.status(404).end("Not Found")
})
// Error Handling
app.use(errorHandler)

const start = async () => {
    try {
        const port = 5000
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listen on Port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()
