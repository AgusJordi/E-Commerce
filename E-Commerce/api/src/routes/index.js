const { Router } = require('express');
// import all routers;
const beerRouter = require('./beer.js');
const orderRouter = require('./order.js');
const styleRouter = require('./style.js');
const userRouter = require('./user.js');

const router = Router();

router.use('/beers', beerRouter);
router.use('/orders', orderRouter);
router.use('/styles', styleRouter);
router.use('/users', userRouter);

module.exports = router;
