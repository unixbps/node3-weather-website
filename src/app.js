const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Getting port from heroku
const port = process.env.PORT || 3000

//app.com -- root directory/page
//app.com/help
//app.com/about
//app.com/weather

//Syntax of "express" server
// app.get ('path', (request, response) => {

// })

// app.get('', (req, res) => {
//     res.send('Hello Express!!!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })

// app.get('/about', (req, res) => {
//     res.send('About the site')
// })

// app.get('/weather', (req, res) => {
//     res.send('Weather report')
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

// -----------Integrating JSON/HTML in epress

//HTML example
// app.get('', (req, res) => {
//     res.send("<h1>Welcome</h1>")
// })

// //JSON example
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Pratheesh',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Me</h1>")
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: "It is snowing",
//         location: "Philadelphia"
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

// ----Serving Up static Assets----

// console.log(__dirname) //Prints directory path
// console.log(__filename) //Prints current file path

const path = require('path')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.use(express.static())

//JSON example
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Pratheesh',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Me</h1>")
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: "It is snowing",
//         location: "Philadelphia"
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

// ----------Dynamic content---------
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pratheesh'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Abot Me',
        name: 'Pratheesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})


//Showing 404 page
// app.get('/help/*', (req, res) => {
//     res.send('Help article not found')
// })

//----Created weather endpoint----

// app.get('/weather', (req,res) => {
//     if(!req.query.address) {
//         return res.send({
//             error: 'You must provide address'
//         })
//     }
//     console.log(req.query.address)
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia',
//         address: req.query.address
//     })
// })


//-----Below code will fail when u provide "address=!", because it didn't get correct address

// app.get('/weather', (req,res) => {
//     if(!req.query.address) {
//         return res.send({
//             error: 'You must provide address'
//         })
//     }

//     geocode(req.query.address, (error, {latitude, longitude, location }) => {

//         if (error) {
//             return res.send({ error })
//         }
    
//         forecast(latitude, longitude, (error, forecastData) => {
//             if(error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })


//--Below code will fix the above issue---

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pratheesh',
        errorMessage: 'Help article not found.'
    })
})


// app.get('*', (req, res) => {
//     res.send('My 404 page')
// })

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Pratheesh',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})