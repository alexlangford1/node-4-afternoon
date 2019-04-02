const express = require('express')
const session = require('express-session')
require('dotenv').config()
const app = express()
const { SERVER_PORT, SESSION_SECRET } = process.env
const checkSession = require('./middleWare/checkForSession')
const swag = require('./controller/swagController')
const auth = require('./controller/authController')
const cart = require('./controller/cartController')
const search = require('./controller/searchController')
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 999999999
    }
}))
app.use(checkSession)



app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)
app.get('/api/swag', swag.read)

app.post('/api/cart/checkout', cart.checkout)
app.post('/api/cart', cart.add)
app.delete('/api/cart', cart.delete)
app.get('/api/search', search.search)












app.listen(SERVER_PORT, () => {
    console.log('listening on port', SERVER_PORT)
})