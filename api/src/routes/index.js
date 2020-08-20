const { Router } = require("express");
// import all routers;

const routerProduct = require("./routerProduct.js");
const routerCategory = require("./routerCategory.js");
const authRouter = require("./auth.js");
const routerColor = require("./routerColors.js");
const routerUser = require("./routerUser.js");
const routerOrden = require("./routerOrden.js");
const routerReview = require("./routerReview.js");
const routerLineaDeOrden = require("./routerLineaDeOrden.js");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/auth", authRouter);
router.use("/product", routerProduct);
router.use("/category", routerCategory);
router.use("/color", routerColor);
router.use("/user", routerUser);
router.use("/orden", routerOrden);
router.use("/review", routerReview);
router.use("/lineaDeOrden", routerLineaDeOrden);

module.exports = router;
