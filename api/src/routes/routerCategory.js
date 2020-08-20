const { Category, Product } = require("../models");
const express = require("express").Router();

express.get("/", function (req, res) {
  Category.findAll().then(function (categories) {
    res.status(200).json(categories);
  });
});

express.post("/add", function (req, res) {
  const { name } = req.body;
  Category.create(
    {
      name: name,
    },
    { fields: ["name"] }
  )
    .then(function (category) {
      res.status(200).json({
        message: "Se creo correctamente la categoria",
        data: category,
      });
    })
    .catch(function (err) {
      res.status(404).json({ err: "No se creó la categoria" });
    });
});

express.put("/modify", function (req, res) {
  const { id, name } = req.body;
  Category.findOne({
    where: {
      id: id,
    },
  }).then(function (category) {
    Product.findOne({
      where: {
        idCategory: category.id,
      },
    })
      .then(function (product) {
        console.log(product);
        if (!product) {
          Category.update(
            {
              name: name,
            },
            {
              where: {
                id: id,
              },
              returning: true,
            }
          )
            .then(function (deletedCategory) {
              res.status(200).json({
                message: "Se modifico la categoria",
                data: deletedCategory,
              });
            })
            .catch(function (err) {
              res
                .status(400)
                .json({
                  message: "No se pudo modificar la categoria",
                  data: err,
                });
            });
        } else {
          res
            .status(400)
            .json({ message: "No se pudo modificar la categoria" });
        }
      })
      .catch(function (response) {
        res
          .status(400)
          .json({ message: "No se pudo modificar la categoria", data: err });
      });
  });
});

express.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  Category.findOne({
    where: {
      id: id,
    },
  }).then(function (category) {
    Product.findOne({
      where: {
        idCategory: category.id,
      },
    })
      .then(function (product) {
        console.log(product);
        if (!product) {
          Category.destroy({
            where: {
              id: id,
            },
          })
            .then(function (deletedCategory) {
              res.status(200).json({
                message: "Se borro la categoria",
                data: deletedCategory,
              });
            })
            .catch(function (err) {
              res
                .status(400)
                .json({ message: "No se pudo borrar la categoria", data: err });
            });
        } else {
          res.status(400).json({ message: "No se pudo borrar la categoria" });
        }
      })
      .catch(function (response) {
        res
          .status(400)
          .json({ message: "No se pudo borrar la categoria", data: err });
      });
  });
});

module.exports = express;
