const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.port || 5000
const mainRouter = require('./routes/index.js')
const apiKey = require('./middlewares/apiKey.js')
const apiKeyMiddleware = require('./middlewares/apiKey.js')
const productRouter = require('./routes/products.js')
const ErrorHandler = require('./errors/ErrorHandler.js')
const MongoClient = require('mongodb').MongoClient

//middleware and route dono ke andar next milega

app.set('view engine',"ejs")
app.set('views',path.resolve(__dirname) + '/templates')
//views is the default folder for html but ew can change it to templates like we did above
app.use(express.static('public'))
app.use(express.json())
// app.use(express.urlencoded({extended: false}))// normal form submission like action
// app.use(apiKeyMiddleware)// Global Middleware on all req actions
app.use(productRouter)
app.use(mainRouter)

// upar ke dono product and main router check ho jayega then neeche wala global router check hoga
//error handling middleware
app.use((err,req,res,next) => {
    if(err instanceof ErrorHandler){
        res.status(err.status).json({
            error: {
                message: err.message,
                status:err.status
            }
        })
    }else{
        res.status(500).json({
            error: {
                message: err.message,
                status:err.status
            }
        })
    }
    // next()// ye tabhi chahiye if koi response send nhi kar rhe , its like return of a function
})


app.listen(PORT, () => console.log(`On PORT ${PORT}`))
