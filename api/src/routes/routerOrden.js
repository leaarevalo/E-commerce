const {
  Orden,
  User,
  Product,
  stockXColor,
  lineaDeOrden,
} = require("../models");
const { Op } = require("sequelize");
const express = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const api_key = "8381382195e41d085e0f199b313cbcad-a83a87a9-063cbc74";
const domain = "sandbox5b0b711707ab4143bdc3afec9d3e1c1b.mailgun.org";
//const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
const data = {
  from: "Juan Galarce <j6alarce@gmail.com>",
  to: "blasxphemian@gmail.com",
  subject: "Natalia Torres - Joyas",
  text:
    "Compra Realizada, espere confirmacion de despacho. Gracias por su preferencia",
};
// Trae las ordenes de un usuario idUsuario
express.get("/:userId", function (req, res) {
  Orden.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(function (orden) {
      res.status(200).json(orden);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo obtener las ordenes", data: reason });
    });
});

// Trae todas las ordenes
express.get("/", function (req, res) {
  Orden.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: stockXColor,
      },
    ],
  })
    .then(function (ordenes) {
      res.status(200).json(ordenes);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo obtener las ordenes", data: reason });
    });
});
// return models.users.findOrCreate({
//     where: {
//       userId:    profile.userId,
//       name:      profile.name
//     },
//TODO: Controlar que no existe una orden ya creada para un usuario usar método findOrCreate
//TODO: la orden debe relacionarse mediante la linea de orden hacia los productos y pertenecer a un unico usuario (idUsuario)

//MIDDLEWARE PARA VERIFICAR SI EL USUARIO ESTA LOGUEADO CON UN TOKEN VALIDO
function isValidToken(req, res, next) {
  var token = req.body.token;
  if (!token) {
    res.status(401).send({
      error: "Es necesario el token de autenticación",
    });
    return;
  }
  token = token.replace("Bearer ", "");
  jwt.verify(token, "Roberta2020", function (err, user) {
    if (err) {
      res.status(401).send({
        error: "Token inválido",
      });
    } else {
      res.status(200);
      next();
    }
  });
}
express.post("/add", isValidToken, function (req, res) {
  const { userId, fecha } = req.body;
  Orden.create({
    state: "completo",
    fecha: fecha,
    userId: userId,
  })
    .then(function (orden) {
      res.status(200).json(orden);
      /*  mailgun.messages().send(data, function (error, body) {
        console.log(body);
      }); */
    })
    .catch(function (error) {
      res.status(404).json({
        message: "Ocurrió un error, no se pudo crear la orden",
        data: error,
      });
    });
});

// Modificar el estado de una orden, una orden puede tener los siguientes estados de este flujo:
// creado => cancelado / procesando => cancelado / completo
// sólo una orden puede tener el estado creado o procesando, pero muchas pueden tener el estado cancelado o completo
// Se debe checkear que la orden a modificar depende del estado que tiene inicialmente, una orden recien creada no se puede completar si no ha pasado antes por el estado de procesando
express.put("/modify", function (req, res) {
  const { id, state, fecha } = req.body;
  // Antes del update validar si el estado actual de la orden con id:id corresponde con el flujo de arriba
  // if (state === "completado"){
  //    Orden.findOne({
  //        where: {id: id}
  //    }).then( orden => {
  //        if (orden.state === "completado" ||
  //            orden.state === "create" ||
  //            orden.state === "cancelado"){
  //                  abortar con algun error
  // }
  // })} lo mismo de cancelar algo ya completo, solo se puede cancelar lo creado o procesando
  // Lo mismo con procesando, solo se puede procesar algo creado, no puede procesar cancelado o completo
  // si pasa todas las validaciones entonces hacer el update
  Orden.update(
    {
      state: state,
      fecha: fecha,
    },
    {
      where: {
        id: id,
      },
    }
  ).then(function (orden) {
    res.status(200).json(orden);
  });
});

// Borra una orden (carrito)
express.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  Orden.destroy({
    where: {
      id: id,
    },
  })
    .then(function (response) {
      res
        .status(200)
        .json({ message: "Se elimino con exito", count: response });
    })
    .catch(function (err) {
      res
        .status(404)
        .json({ message: "Ocurrió un error, no se pudo eliminar", data: err });
    });
});

// Agregar un producto a una orden
// No se que verbo debería usar
express.post("/addProduct/:idOrden/:idProduct", function (req, res) {
  const { cantidad, price } = req.body;
  const { idProducto } = req.params.idProducto;
  const { idOrden } = req.params.idOrden;
  // Validar que el stock del producto de id: idProducto no sea 0
  // Obtener el producto con esa id y si su stock es mayor a 0 entonces agregarlo al carrito, sino error!
  LineaDeOrden.create(
    {
      cantidad,
      price,
      // idProducto,
      // idOrden
    }
    // {
    //   include: Product,
    //     where: {
    //       id:idProducto
    //     }
    // },
    // {
    //   include: Orden,
    //     where: {
    //       id:idOrden
    //     }
    // }
  )
    .then(function (response) {
      res
        .status(200)
        .json({ message: "Se agregó el producto al carrito", data: response });
    })
    .catch(function (reason) {
      res.status(404).json({
        message: "No se pudo agregar el producto al carrito",
        data: reason,
      });
    });
});

module.exports = express;
