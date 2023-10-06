const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      height_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      weight_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      lifeTime: {
        type: DataTypes.INTEGER,
      },

      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/perros-vivir-mas-anos-1669733501.jpg",
      },

      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
