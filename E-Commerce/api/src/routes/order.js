const server = require('express').Router();
const { Order: Order } = require('../db.js');
const { OrderBeer: OrderBeer } = require('../db.js');
const { Beer: Beer } = require('../db.js');

// S44 : Crear ruta que retorne todas las ordenes
// GET /orders?status=value
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status.
server.get('/', (req, res) => {
    Order.findAll({
        where: { status: req.query.status }
    }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
})
// S46 : Crear Ruta que retorne una orden en particular.
// GET /orders/:id
server.get('/:id', (req, res) => {
    OrderBeer.findAll({
        where: { orderId: req.params.id },
        include: [{ model: Beer }, { model: Order }]
    }).then(orderBeer => { res.json(orderBeer); }).catch(error => { res.status(400).json({ error }) })
})
// S47 : Crear Ruta para modificar una Orden
// PUT /orders/:id
server.put('/:id', (req, res) => {
    OrderBeer.findOne({
        where: { id: req.params.id }
    }).then(orderBeer => {
        orderBeer.update({
            beerId: req.body.beerId,
            quantity: req.body.quantity
        }).then(orderBeer => { res.status(200).json({ orderBeer }); }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})
// Crear Ruta para cerrar una Orden
// PUT /orders/:id
server.put('/:id/close', (req, res) => {
    Order.findOne({
        where: { id: req.params.id }
    }).then(order => {
        order.update({
            status: "closed",
            totalPrice: req.body.totalPrice,
            address: req.body.address,
            email : req.body.email
        }).then(order => { res.status(200).json({ order }); }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})
module.exports = server;