const swag = require("../models/swag")

module.exports = {
  add: (req, res) => {
    const { id } = req.query
    const { user } = req.session
    const item = user.cart.findIndex((i) => i.id == id)
    if (item === -1) {
      let newItem = swag.find((e) => e.id == id)
      user.cart.push(newItem)
      user.total += newItem.price
      res.status(200).send(user)
    } else {
      res.status(200).send(user)
    }
  },

  delete: (req, res) => {
    const { id } = req.query
    const { user } = req.session
    const item = user.cart.findIndex((i) => i.id == id)
    user.total -= user.cart[item].price
    user.cart.splice(item, 1)
    res.status(200).send(user)
  },

  checkout: (req, res) => {
    const { user } = req.session
    user.cart = []
    user.total = 0
    res.status(200).send(user)
  },
}
