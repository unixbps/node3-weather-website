const request = require('request')

// const forecast = (latitude, longitude, callback) => {
    // const url = 'https://api.darksky.net/forecast/4a3f4b5799a0773affe595ae6908570b/' + latitude + ',' + longitude

//     request( { url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + ' chance of rain.' )
//         }
//     })
// }

//-------Destructuring------------
const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/4a3f4b5799a0773affe595ae6908570b/' + latitude + ',' + longitude
    request( { url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain.' )
        }
    })
}

module.exports = forecast