const router = require('express').Router()
const apiKeyMiddleware = require('../middlewares/apiKey')


// router.use(apiKeyMiddleware)// applies middleware to all routes

//router ko app.get bhi likh sakte ho 
router.get('/',(req,res) => {
    // res.send('Hello From Express')
    // res.sendFile(path.resolve(__dirname) + '/index.html')
    res.render('index', {
        title: 'My Home Page'
    })
})

router.get('/about',(req,res) => {
    res.render('about', {
        title: 'My About Page'
    })
})

router.get('/download',(req,res) => {
    res.download(path.resolve(__dirname) + '/about.html')
})

// router.get('/api/products',apiKeyMiddleware, (req,res) => {
//     res.json([
//         {
//             id: '1',
//             name: 'apple'
//         },
//         {
//             id: '2',
//             name: 'mango'
//         }
//     ])
// })

module.exports = router