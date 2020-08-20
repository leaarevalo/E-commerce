const Category = (sequelize, S) => {
  const C = sequelize.define(
    "category",
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
    },
    { timestamp: false }
  );

  return C;
};

module.exports = Category;
