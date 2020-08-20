const lineaDeOrden = (sequelize, S) => {
  const M = sequelize.define("lineaDeOrden", {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cantidad: {
      type: S.INTEGER,
      allowNull: false,
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
  });

  return M;
};

module.exports = lineaDeOrden;
