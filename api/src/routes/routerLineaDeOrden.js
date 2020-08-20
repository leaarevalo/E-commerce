const { Orden, User, Product, lineaDeOrden } = require("../models");
const { Op } = require("sequelize");
const express = require("express").Router();

express.post("/add", function (req, res) {
  const {cantidad, price, stockXColorId, ordenId } = req.body;
  lineaDeOrden.create(
    {
      cantidad: cantidad,
      price: price,
      ordenId: ordenId,
      stockXColorId: stockXColorId
    }
  )
  .then(function(lineaorden){
    res.status(200).json(lineaorden);
  })
  .catch(function (error) {
    res.status(404).json({
      message: "Ocurrió un error, no se pudo crear la orden",
      data: error,
    });
  });
});


module.exports = express;


