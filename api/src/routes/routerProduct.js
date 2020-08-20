const { Product, Category, stockXColor, Review, Colors, User } = require("../models");
const { Op } = require("sequelize");
const express = require("express").Router();

//const server = express();
/*
{
        "id": 1,
        "name": "Pulsera Noruega",
        "description": "Pulsera en gamuza con cristal de roca facetado, agatas y detalles de metal.",
        "price": 1050,
        "keywords": "[pulseras, gamuza, agatas, metal, piedras, cristales]",
        "image": "urlFotoCollar",
        "createdAt": "2020-06-28T02:17:53.028Z",
        "updatedAt": "2020-06-28T02:17:53.028Z",
        "idCategory": 5,
        "categoria": {
            "name": "Pulseras"
        },
        "colors": [
            {
                "id": 1,
                "name": "Negro",
                "hexaColor": "#000000",
                "createdAt": "2020-06-28T02:17:53.026Z",
                "updatedAt": "2020-06-28T02:17:53.026Z",
                "stockXColor": {
                    "id": 1,
                    "cantidad": 3,
                    "image": "../../",
                    "main": true,
                    "createdAt": "2020-06-28T02:17:53.028Z",
                    "updatedAt": "2020-06-28T02:17:53.028Z",
                    "productId": 1,
                    "colorId": 1
                }
            },
            {
                "id": 2,
                "name": "Rojo",
                "hexaColor": "#ff3636",
                "createdAt": "2020-06-28T02:17:53.026Z",
                "updatedAt": "2020-06-28T02:17:53.026Z",
                "stockXColor": {
                    "id": 2,
                    "cantidad": 7,
                    "image": "img/pulseras/p-noruega-rojo.jpg",
                    "main": false,
                    "createdAt": "2020-06-28T02:17:53.028Z",
                    "updatedAt": "2020-06-28T02:17:53.028Z",
                    "productId": 1,
                    "colorId": 2
                }
            }
        ]
    },
*/

express.post("/add", function (req, res) {
  const { name, description, price, keywords, image, idCategory } = req.body;
  // console.log(req.body.colors);
  Product.create(
    {
      name: name,
      description: description,
      price: price,
      keywords: keywords,
      image: image,
      idCategory: idCategory,
      colors: req.body.colors,
    },
    {
      include: Colors,
    }
  )
    .then(function (product) {
      res.status(200).json(product);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo guardar el producto", data: reason });
    });
});

express.get("/", function (req, res) {
  Product.findAll({
    include: [
      {
        model: Category,
        as: "categoria",
        attributes: ["name"],
      },
      {
        model: Colors
      },
      {
        model: Review,
        as: "reviews",
      },     
    ],
  })
    .then(function (catalogo) {
      res.status(200).json(catalogo);
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se obtuvieron los productos", data: reason });
    });
});
// User.findAll({
//   include: {
//     model: Tool,
//     as: 'Instruments',
//     where: {
//       size: {
//         [Op.ne]: 'small'
//       }
//     }
//   }
// });

express.get("/stockXColor/:id", function (req, res) {
  /*  stockXColor
    .findAll()
    .then(function (colores) {
      res.status(200).json(colores);
    })
    .catch(function (err) {
      res.status(404).json({ data: err });
    }); */
  const id = req.params.id;
  Product.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: Colors,
      },
    ],
  }).then(function (product) {
    res.status(200).json(product[0].colors);
    stockXColor.destroy({
      where: { productId: id },
    });
  });
});

// express.post("/add", function (req, res) {
//   const { name, description, price, idCategory, keywords } = req.body;
//   Product.create(
//     {
//       name: name,
//       description: description,
//       price: price,
//       idCategory: idCategory,
//       keywords: keywords,
//     },
//     { fields: ["name", "description", "price", "idCategory", "keywords"] }
//   );
// });

express.post("/modify", function (req, res) {
  Product.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then(function (product) {
      if (product) {
        var newProducto = {
          name: product.name,
          description: product.description,
          price: product.price,
          idCategory: product.idCategory,
          keywords: product.keywords,
        };
        return product.update(newProducto);
      }
    })
    .catch(function (reason) {
      res
        .status(404)
        .json({ message: "No se pudo actualizar el producto", data: reason });
    });
});

/* express.get("/get/:category", function (req, res) {
  Category.findOne({
    where: {
      id: req.params.category,
    },
  })
    .then(function (category) {
      Product.findAll({
        where: {
          idCategory: category.id,
        },
      }).then(function (products) {
        res.status(200).json(products);
      });
    })
    .catch(function (err) {
      res.status(404).json({ err: "No se encontro el id", data: err });
    });
}); */

express.get("/keys/:keywords", function (req, res) {
  var keys = req.params.keywords.split("-").join(",").toLowerCase();
  console.log(keys);
  Product.findAll({
    where: {
      [Op.or]: [
        {
          keywords: {
            [Op.iLike]: `${keys}`,
          },
        },
        {
          keywords: {
            [Op.substring]: `${keys}`,
          },
        },
      ],
    },
  })
    .then(function (products) {
      res.status(200).json(products);
    })
    .catch(function (err) {
      res.status(404).json({ data: err });
    });
});

express.put("/modify", (req, res) => {
  const id = req.body.id;
  // console.log(req.body.colors);
  Product.update(
    {
      // Datos
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      idCategory: req.body.idCategory,
      keywords: req.body.keywords,
      colors: req.body.colors,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    },
    {
      include: Colors,
    }
  )

    .then((response) => {
      const product = response[1][0];
      res.json(product);
      //res.send({ message: "test" });
    })
    .catch((err) => res.send(err.message));
});

express.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((deletedProduct) => {
      res.json({
        message: "Producto Eliminado",
        count: deletedProduct,
      });
    })
    .catch((err) => res.send(err.message));
});

module.exports = express;
