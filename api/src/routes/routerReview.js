const { User, Product, Review } = require("../models");
const express = require("express").Router();

express.get("/", function (req, res) {
  Review.findAll()
    .then(function (reviews) {
      res.status(200).json(reviews);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se obtuvieron las reviews", data: reason });
    });
});

express.get("/product/:id", function (req, res) {
  Review.findAll({
    where: {
      idProduct: req.params.id,
    },
  })
    .then(function (reviews) {
      res.status(200).json(reviews);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se obtuvieron las reviews", data: reason });
    });
});

express.get("/user/:id", function (req, res) {
  Review.findAll({
    where: {
      idUsuario: req.params.id,
    },
  })
    .then(function (reviews) {
      res.status(200).json(reviews);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se obtuvieron las reviews", data: reason });
    });
});

express.post("/add", function (req, res) {
  const { title, review, ranking, idUsuario, idProduct } = req.body;
  Review.create({
    title,
    review,
    ranking,
    idUsuario,
    idProduct,
  })
    .then(function (review) {
      res.status(200).json({ review, message: "Se guardo la review" });
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo crear la review", data: reason });
    });
});

express.put("/modify", function (req, res) {
  const { title, review, ranking, id } = req.body;
  Review.update(
    {
      title,
      review,
      ranking,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(function (review) {
      res.status(200).json({ review, message: "Se actualizó la review" });
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo actualizar la review", data: reason });
    });
});

express.delete("/delete/:id", function (req, res) {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (review) {
      res.status(200).json({
        message: "Se eleminó la review: " + review,
      });
    })
    .catch(function (err) {
      res.status(404).json({
        message: "No se pudo eliminar la review " + err,
      });
    });
});

module.exports = express;
