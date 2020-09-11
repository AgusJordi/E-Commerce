const server = require("express").Router();
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
var passport = require('passport');
const { User: User } = require('../db.js');
const { Beer: Beer } = require('../db.js');
const { Order: Order } = require('../db.js');
const { OrderBeer: OrderBeer } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// S36 : Crear Ruta que retorne todos los Usuarios
// GET /users
server.get('/', (req, res, next) => {
    User.findAll().then(users => { res.json(users); }).catch(error => { res.status(400).json({ error }) })
});
// S34 : Crear Ruta para creación de Usuario
// POST /users
server.post('/', (req, res) => {
  
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        image: req.body.image,
        admin: req.body.admin,
    }).then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) })
});
// S35 : Crear Ruta para modificar Usuario
// PUT /users/:id
server.put('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        user.update({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            image: req.body.image,
            admin: req.body.admin,
        }).then(user => { res.status(200).json({ user }); }).catch(error => { res.status(400).json({ error }) });
    }).catch(error => { res.status(400).json({ error }) })
});
// S37 : Crear Ruta para eliminar Usuario
// DELETE /users/:id
server.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    }).then(deletedRecord => {
        if (deletedRecord === 1) { res.status(200).json({ message: "User deleted successfully" }); }
        else { res.status(404).json({ message: "User not found" }) }
    }).catch(error => { res.status(500).json(error); });
});
//S38 : Crear Ruta para agregar Item al Carrito
// POST /users/:idUser/cart
server.post('/:idUser/cart', (req, res) => {
    Order.findOrCreate({
        where: { userId: req.params.idUser, status: "open" },
        defaults: { userId: req.params.idUser, status: "open", totalPrice: 0 }
    }).then(order => {
        OrderBeer.findOrCreate({
            where: { beerId: req.body.beerId, orderId: order[0].id, },
            defaults: { beerId: req.body.beerId, orderId: order[0].id, quantity: req.body.quantity }
        }).then(orderBeer => {
            if (orderBeer[1]) res.status(200).json(orderBeer[0])
            else {
                let cantidad = parseInt(req.body.quantity) + parseInt(orderBeer[0].quantity);
                orderBeer[0].update({
                    quantity: cantidad
                }).then(orderBeer => { res.status(200).json(orderBeer) }).catch(error => { res.status(400).json({ error }) })
            }
        }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})
// S39 : Crear Ruta que retorne todos los items del Carrito
// GET /users/:idUser/cart
// El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.
server.get('/:idUser/cart', (req, res) => {
    Order.findOrCreate({
        where: { userId: req.params.idUser, status: "open" },
        defaults: { userId: req.params.idUser, status: "open", totalPrice: 0 }
    }).then(order => {
        OrderBeer.findAll({
            where: { orderId: order[0].id },
            include: [{ model: Beer }, { model: Order }]
        }).then(orderBeers => { res.json(orderBeers); }).catch(error => { res.status(400).json({ error }) })
    })
})
// S40 : Crear Ruta para vaciar el carrito
// DELETE /users/:idUser/cart/
server.delete('/:idUser/cart', (req, res) => {
    Order.findOne({
        where: { userId: req.params.idUser, status: "open" }
    }).then(order => {
        OrderBeer.destroy({
            where: { orderId: order.id }
        }).then(deletedRecord => {
            if (deletedRecord === 1) { res.status(200).json({ message: "Cart cleared successfully" }); }
            else { res.status(404).json({ message: "Cart not found" }) }
        }).catch(error => { res.status(400).json({ error }) })
    }).catch(error => { res.status(400).json({ error }) })
})

// NECESARIA : Crear Ruta para eliminar un item del carrito
// DELETE /users/:idUser/cart/:item
server.delete('/:idUser/cart/:item', (req, res) => {
    Order.findOne({
        where: { userId: req.params.idUser, status: "open" }
    }).then(order => {
        OrderBeer.findOne({
            where: { orderId: order.id, beerId: req.params.item }
        }).then(OrderBeer => {
            OrderBeer.destroy({
                where: { beerId: req.params.item }
            }).then(deletedOrder => { res.status(200).json({ deletedOrder });
            }).catch(error => { res.status(400).json({ error }) })
        })
    })
})

// }).then(orderBeer => { res.status(200).json({ orderBeer }); })
// S41 : Crear Ruta para editar las cantidades del carrito
// PUT /users/:idUser/cart
server.put('/:idUser/cart', (req, res) => {
    Order.findOne({
        where: { userId: req.params.idUser, status: "open" }
    }).then(order => {
        OrderBeer.findOne({
            where: { orderId: order.id, beerId: req.body.beerId }
        }).then(orderBeer => {
            if(req.body.quantity === 'sumar') {
                orderBeer.update({
                    quantity: orderBeer.quantity + 1
                })
                res.status(200).json({ orderBeer });
            }
            if(req.body.quantity === 'restar') {
                orderBeer.update({
                    quantity: orderBeer.quantity - 1
                })
                res.status(200).json({ orderBeer });
            }
        })
    }).catch(error => { res.status(400).json({ error }) })
})
// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
// GET /users/:id/orders 
server.get('/:idUser/orders', (req, res) => {
    Order.findOrCreate({
        where: { userId: req.params.idUser, status: "closed" }
    }).then(orders => { res.json(orders); }).catch(error => { res.status(400).json({ error }) })
})

// S63: Crear ruta de login
// POST /users/login
// code source: https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
// server.post('/login', (req, res) => {
//     var username = req.body.username, password = req.body.password;
//     User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) { res.redirect('/login'); }
//         else if (!user.validPassword(password)) { res.redirect('/login'); }
//         else {
//             req.session.user = user.dataValues;
//             res.redirect('/me');
//         }
//     });
// });

server.post('/login',
    passport.authenticate('local'),
    function(req, res) {
    res.json(req.user);
});

server.get('/failed', (req, res) => res.send('No pudimos logearte con google'))
server.get('/good', isAuthenticated, (req, res) => res.send(`Te logeaste con google, tu mail es ${req.user.emails[0].value}!`))

server.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3001/cart');
  });


// S64 : Crear ruta de logout
// POST /users/logout

server.post('/logout',
  function(req, res){
    req.logout();
    res.send('Usuario deslogueado');
  });


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    return res.json({ 
        isAdmin: false,
        message: 'User not authenticated'
    })
  }
}



function isAdmin(req, res, next) {
    if(req.user.admin === true) {
      next();
    } else {
      res.redirect('/admin');
    }
}

// S65
// GET /users/me
server.get('/me',
    isAuthenticated,
    function(req, res){
    return res.json(req.user);
});

server.get('/admin',
    isAuthenticated,
    isAdmin,
    function(req, res){
    res.json(req.user);
    {
    res.status(401).send('No eres Administrador');  
    }
});

// server.get('/me',(req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.sendFile(__dirname + '/public/me.html');
//     } else { res.redirect('/login'); }
// });

// S67 atributo admin al usuario 
server.put('/promote/:idUser', (req, res) => {
    User.findOne({
        where: { id: req.params.idUser}
    })
    .then (user => {
        user.update({
            admin: !user.admin
        }).then(user => {res.status(200).json ({user})})
  }).catch(error => { res.status(400).json({ error }) })
});

// S70 reset password
server.put('/:id/passwordReset', (req, res) => {
    User.findOne({
        where: { id: req.params.id}
    })
    .then (user => {
     
        user.update({
            password: req.body.password,
        }).then(user => {res.status(200).json ({user})})
  }).catch(error => { res.status(400).json({ error }) })
});
// trae 1 usuario
server.get('/:id', (req, res, next) => {
    User.findByPk(req.params.id, {
        // include: user.isAdmin
    })
        .then((user) => {
            if (!user) { return res.status(404).end(); }
            return res.json(user)
        })
        .catch(err => { console.log(err) });
});


server.post('/order-mail', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "six.beers.store@gmail.com",
            pass: "seisbirras"
        } 
    }) 

const mailOptions = {
    from: "SixBeers <six.beers.store@gmail.com>",
    to: req.body.email,
    subject: `¡Hola ${req.body.name}, gracias por tu compra en SixBeers!`,
    html: `   <html>
	<head>
        <body>
        <h1> ¡Hola ${req.body.name}, gracias por tu compra! </h1>
            <h3>Tu pedido ha sido procesado y se encuentra pendiente de pago. Por favor, hacé click en <a href= "https://www.mercadopago.com.ar/home">este link<a/> para completarlo. </h3>
            <h2>Total de la compra: $${req.body.total} </h2>
            <img src= 'https://i.postimg.cc/qvqCzt3R/logosixbeer.png'/>
		</body>
	</head>
</html>`
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        res.status(500).send(error.message)
    } else {
        console.log("¡Email enviado con éxito!")
        res.status(200).json(req.body)
    }
})
});

module.exports = server;