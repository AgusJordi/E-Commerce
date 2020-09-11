const server = require("express").Router();
const { Style: Style } = require("../db.js");
const { Beer: Beer } = require("../db.js");

//S22 Crea Ruta que devuelva los productos de X categoria
server.get("/:styleName", (req, res) => {
  Style.findOne({
    where: { name: req.params.styleName.toLowerCase() }
  }).then((style) => {
    Beer.findAll({
      where: { styleId: style.id },
      include: [{ model: Style }]
    }).then((beers) => { res.json(beers); }).catch(error => { res.status(400).json({ error }) })
  }).catch(error => { res.status(400).json({ error }) })
});
server.get("/", (req, res, next) => {
  if (req.query.styleName) Style.findOne({
    where: { name: req.query.styleName }
  }).then((style) => { res.send(style) }).catch(error => { res.status(400).json({ error }) })
  else Style.findAll().then((style) => { res.send(style); }).catch(error => { res.status(400).json({ error }) })
});
module.exports = server;
