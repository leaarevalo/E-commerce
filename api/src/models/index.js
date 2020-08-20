const fs = require("fs");
const path = require("path");
const db = require("../db.js");
const { userInfo } = require("os");
/* const {Product, Colors, Category} = require ('models'); */

const basename = path.basename(__filename);
const models = {};

models.conn = db();

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = models.conn.import(path.join(__dirname, file));
    const name = file.split(".")[0];
    models[name] = model;
  });

const {
  Product,
  Category,
  Colors,
  stockXColor,
  User,
  Orden,
  lineaDeOrden,
  Review,
} = models;

// Add model relationships here
// product has many category
Product.belongsToMany(Colors, { through: stockXColor, onUpdate: "cascade" });
Colors.belongsToMany(Product, { through: stockXColor });

Category.hasMany(Product, {
  as: "productos",
  foreignKey: "idCategory",
});
Product.belongsTo(Category, { as: "categoria", foreignKey: "idCategory" });

// Relación de reviews
User.hasMany(Review, { as: "reviews", foreignKey: "idUsuario" }); 
Review.belongsTo(User, { as: "usuario", foreignKey: "idUsuario", onDelete: "cascade" }); 
Product.hasMany(Review, { as: "reviews", foreignKey: "idProduct" }); 
Review.belongsTo(Product, { as: "producto", foreignKey: "idProduct", onDelete: "cascade" }); 

stockXColor.belongsToMany(Orden, { through: lineaDeOrden });
Orden.belongsToMany(stockXColor, { through: lineaDeOrden });

User.hasMany(Orden, { as: "ordenes", foreignKey: "userId" });
Orden.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

module.exports = models;
