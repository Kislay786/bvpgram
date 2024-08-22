const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json()) //middleware- body-parser
app.use(express.urlencoded({extended : false})) // middleware to accept forms

app.get('/', (req,res) => {
    res.status(200).json({message: 'welcome to GRAM api'})
}
)

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)
 )


