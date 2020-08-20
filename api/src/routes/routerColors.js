const { Colors } = require("../models");
const { Op } = require("sequelize");
const express = require("express").Router();

express.get("/", function (req, res) {
  Colors.findAll()
    .then(function (Colors) {
      res.status(200).json(Colors);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se encontraron colores", data: reason });
    });
});

express.post("/add", function (req, res) {
  const { name, hexaColor } = req.body;
  Colors.create(
    {
      name: name,
      hexaColor: hexaColor,
    },
    { fields: ["name", "hexaColor"] }
  )
    .then(function (color) {
      res
        .status(200)
        .json({ message: "Se creo el color con exito", data: color });
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo crear el color", data: reason });
    });
});

express.put("/modify", function (req, res) {
  const { id, name } = req.body;
  Colors.update(
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
    .then(function (color) {
      res.status(200).json({ message: "Se actualizo con exito", data: color });
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo actualizar el color", data: reason });
    });
});

express.delete("/delete", function (req, res) {
  const { id, name } = req.body;
  Colors.destroy({
    where: {
      id: id,
    },
  })
    .then(function (color) {
      res.status(200).json({ message: "Se elimino con exito", count: color });
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo eliminar el color", data: reason });
    });
});

module.exports = express;
