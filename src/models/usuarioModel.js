import {Sequelize, DataTypes} from 'sequelize';

// Configura la conexión a PostgreSQL usando Sequelize
const sequelize = new Sequelize('usuarios', 'postgres', 'AxE_09-21', {
  host: 'localhost',
  dialect: 'postgres', // Indica que estás usando PostgreSQL
  port: 5432,          // Puerto por defecto de PostgreSQL
});


export function probarConexcion() {
    sequelize.authenticate()
      .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
      })
      .catch((err) => {
        console.error('Error al conectar a PostgreSQL:', err);
      });
}
// Verifica la conexión

//Definir el modelo del producto
export const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true // Edad es opcional
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW // Fecha actual por defecto
    }
  }, {
    tableName: 'usuarios', // Especifica el nombre de la tabla si no deseas que Sequelize pluralice
    timestamps: false // Si no deseas que Sequelize agregue las columnas createdAt y updatedAt
  });

//Sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => console.log('Modelo Sincronizado con la base de datos'))
    .catch(err => console.log('Error al sincronizar el modelo con la base de datos: ', err));
