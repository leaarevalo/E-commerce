const orden = (sequelize, S) => {
  const M = sequelize.define("orden", {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      type: S.ENUM("creado", "procesando", "cancelado", "completo"),
    },
    fecha: {
      type: S.STRING,
      allowNull: false,
    }
  });

  return M;
};

module.exports = orden;
