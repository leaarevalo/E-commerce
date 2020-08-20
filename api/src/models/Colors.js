const Colors = (sequelize, S) => {
  const M = sequelize.define(
    "color",
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
      hexaColor: {
        type: S.STRING,
        allowNull: false,
      },
    },
    { timestamp: false }
  );

  return M;
};

module.exports = Colors;
