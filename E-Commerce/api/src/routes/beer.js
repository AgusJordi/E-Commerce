const server = require('express').Router();
const { Beer: Beer } = require('../db.js');
const { Style: Style } = require('../db.js');
const { Review: Review } = require('../db.js');
const { User: User } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//S21 Crea ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
	Beer.findAll({
		include: [{ model: Style }]
	}).then(beers => { res.json(beers); }).catch(next);
});

/* S25 : Crear ruta para crear/agregar Producto
Controla que estén todos los campos requeridos, si no retorna un status 400.
Si pudo crear el producto retorna el status 201 y retorna la información del producto. */
server.post('/', (req, res) => {
	Style.findOne({
		where: { name: req.body.styleName.toLowerCase() }
	}).then(style => {
		Beer.create({
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			description: req.body.description,
			image: req.body.image,
			IBU: req.body.IBU,
			ABV: req.body.ABV,
			container: req.body.container,
			capacity: req.body.capacity,
			styleId: style.id,
		}).then(beer => { res.status(200).json({ beer }); })
			.catch(error => { res.status(400).json({ error }) })
	}).catch(error => { res.status(400).json({ error }) })
});
/* S26 : Crear ruta para Modificar Producto
PUT /products/:id
Modifica el producto con id: id. Retorna 400 si los campos enviados no son correctos.
Retorna 200 si se modificó con exito, y retorna los datos del producto modificado. */
server.put('/:name', (req, res) => {
	Beer.findOne({
		where: { name: req.params.name.toLowerCase() }
	}).then(beer => {
		Style.findOne({
			where: { name: req.body.styleName.toLowerCase() }
		}).then(style => {
			beer.update({
				name: req.body.name,
				price: req.body.price,
				stock: req.body.stock,
				description: req.body.description,
				image: req.body.image,
				IBU: req.body.IBU,
				ABV: req.body.ABV,
				container: req.body.container,
				capacity: req.body.capacity,
				styleId: style.id,
			}).then(beer => { res.status(200).json({ beer }); })
				.catch(error => { res.status(400).json({ error }) });
		}).catch(error => { res.status(400).json({ error }) });
	}).catch(error => { res.status(400).json({ error }) });
});
/* S27 : Crear Ruta para eliminar Producto
DELETE /products/:id
Retorna 200 si se elimino con exito. */
server.delete('/:name', (req, res) => {
	Beer.destroy({
		where: { name: req.params.name.toLowerCase() }
	}).then(deletedRecord => {
		if (deletedRecord === 1) { res.status(200).json({ message: "Beer deleted successfully" }); }
		else { res.status(404).json({ message: "beer not found" }) }
	}).catch(error => { res.status(500).json(error); });
});
//S18 Crea ruta para crear/agregar Categoria
server.post('/style/', (req, res) => {
	Style.create({
		name: req.body.name, description: req.body.description
	}).then(style => { res.status(200).json({ style }); })
		.catch(error => { res.status(400).json({ error }) });
});
//S19 Crea ruta para Eliminar Categoria
server.delete('/style/:name', (req, res) => {
	Style.destroy({
		where: { name: req.params.name.toLowerCase() }
	}).then(deletedRecord => {
		if (deletedRecord === 1) { res.status(200).json({ message: "Style deleted successfully" }); }
		else { res.status(404).json({ message: "Style not found" }) }
	}).catch(error => { res.status(500).json(error); });
});
//S20 Crea ruta para Modificar Categoria
server.put('/style/:name', (req, res) => {
	Style.findOne({
		where: { name: req.params.name.toLowerCase() }
	}).then(styles => {
		styles.update({
			name: req.body.name,
			description: req.body.description
		}).then(style => { res.status(200).json({ style }); })
			.catch(error => { res.status(400).json({ error }) });
	}).catch(error => { res.status(400).json({ error }) });
});
//S23 ruta que retorna productos segun el keyword de búsqueda
//`GET /search?query={valor}
server.get('/search', (req, res) => {
	Beer.findAll({
		where: {
			[Op.or]: [
				{ name: { [Op.like]: '%' + req.query.query.toLowerCase() + '%' } },
				{ description: { [Op.like]: '%' + req.query.query.toLowerCase() + '%' } }
			]
		},
		include: [{ model: Style }]
	}).then(beers => { res.json(beers); }).catch(error => { res.status(400).json({ error }) });
});
//S24 Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:name', (req, res) => {
	Beer.findOne({
		where: { name: req.params.name.toLowerCase() },
		include: [{ model: Style }]
	}).then(beer => { res.json(beer); }).catch(error => { res.status(400).json({ error }) });
});
//ruta para traer una cerveza
server.get('/product/:id', (req, res) => {
	Beer.findByPk(req.params.id,{ 
		include: [{ model: Style }]})
	.then(beer => { res.json(beer) }).catch(error => { res.status(400).json({ error }) });
});
// S54 : Crear ruta para crear/agregar Review
// POST /product/:id/review
server.post('/:id/review', (req, res) => {
		Review.create({
		comment: req.body.comment,
		rating: req.body.rating,
		beerId: req.params.id,
		userId: req.body.userId
	}).then(review => { res.json(review); }).catch(error => { res.status(400).json({ error }) });
});
// S55 : Crear ruta para Modificar Review
// PUT /product/:id/review/:idReview
server.put('/:id/review/:idReview', (req, res) => {
	Review.findOne({
		where: { beerId: req.params.id, id: req.params.idReview }
	}).then(review => {
		review.update({
			comment: req.body.comment,
			rating: req.body.rating,
		}).then(review => { res.status(200).json({ review }); }).catch(error => { res.status(400).json({ error }) });
	}).catch(error => { res.status(400).json({ error }) });
})
// S56 : Crear Ruta para eliminar Review
// DELETE /product/:id/review/:idReview
server.delete('/:id/review/:idReview', (req, res) => {
	Review.destroy({
		where: { beerId: req.params.id, id: req.params.idReview }
	}).then(deletedRecord => {
		if (deletedRecord === 1) { res.status(200).json({ message: "Review cleared successfully" }); }
		else { res.status(404).json({ message: "Review not found" }) }
	}).catch(error => { res.status(400).json({ error }) });
});
// S57 : Crear Ruta para obtener todas las reviews de un producto.
// GET /product/:id/review/
// Podés tener esta ruta, o directamente obtener todas las reviews en la ruta de GET product.
server.get('/:id/review', (req, res) => {
	Review.findAll({
		where: { beerId: req.params.id },
		include: [{ model: Beer }, { model: User }]
	}).then(review => { res.json(review); }).catch(error => { res.status(400).json({ error }) });
});
/* //S17 Crea ruta para agregar categorias de un producto.
server.post('/:nameBeer/style/:nameStyle', (req, res) => {
	Beer.findOne({
		where: { name: req.params.nameBeer.toLowerCase() }
	}).then((beer) => {
		if (beer)
			beer.update({ styleId: req.params.nameStyle })
				.then(beer => {
					res.status(200).json({ beer });
				}).catch(function (error) {
					res.status(400).json({ error })
				});
		else
			res.status(400).json('beer not found')
	}).catch(function (error) {
		res.status(400).json({ error })
	});
});
//S17 Crea ruta para sacar categorias de un producto.
server.delete('/:nameBeer/style/:nameStyle', (req, res) => {
	Beer.findOne({
		where: { name: req.params.nameBeer.toLowerCase() }
	}).then(function (obj) {
		if (obj)
			obj.update({ styleId: null }).then(beer => {
				res.status(200).json({ beer });
			}).catch(function (error) {
				res.status(400).json({ error })
			});
	})
}); */
module.exports = server;