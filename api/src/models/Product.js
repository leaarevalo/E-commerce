Product = (sequelize, S) => {
  // defino el modelo
  const P = sequelize.define(
    "product",
    {
      id: {
        type: S.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: S.STRING,
        allowNull: false,
      },
      description: {
        type: S.STRING,
        allowNull: false,
      },
      price: {
        type: S.INTEGER,
        allowNull: false,
      },
      keywords: {
        type: S.STRING,
        allowNull: true,
      },
      image: {
        type: S.STRING,
        allowNull: false,
      },
    },
    {
      getterMethods: {
        fullName: function () {
          return this.name;
        },

        getCategory: function () {
          return this.idCategory;
        },
      },
    }
  );

  return P;
};

module.exports = Product;
