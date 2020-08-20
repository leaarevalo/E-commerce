const bcrypt = require('bcrypt');

User = (sequelize, S) => {
  
  const U = sequelize.define("user", {
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
    email: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    adress: {
      type: S.STRING,
      allowNull: true,
    },
    role:{
      type: S.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    }
  }
  );
  U.addHook('beforeCreate',(user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
  });
  
  return U;
};

module.exports = User;
