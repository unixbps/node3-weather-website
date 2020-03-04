// import { response } from "express"

console.log('Clinet side Java script file loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Stop the page reload 

    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log(location)

    //we need to replce line 39 with 37, when running in localhost/machine 
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
          if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error
          } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          }
      })
  })
    
})