const express = require('express')
const { PORT } = require("./include/config")
const { initPool } = require("./include/db_connection")
const { errorHandler } = require("./include/middleware")
const app = express()

//initialize DB connection
app.initDb = async (poolPromise) => { app.pool = await initPool(poolPromise) }

//Available Routes
require('./routes/users')(app)
require('./routes/stories')(app)

// error handler
app.use(errorHandler)

app.initDb(null).then(function () {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})
