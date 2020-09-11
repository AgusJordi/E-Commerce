const { DataTypes, Sequelize } = require('sequelize');
var bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const usuario = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) { this.setDataValue('username', value.toLowerCase()); }
    }, email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'No es una dirección de correo electrónico.'
        }
      },
      allowNull: false,
      unique: true
    }, name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'El nombre tiene demasiados carácteres'
        }
      }
    }, lastName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Los apellidos tienen demasiados carácteres'
        }
      }
    }, address: {
      type: DataTypes.STRING,
      allowNull: false,
    }, image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://www.ibm.com/blogs/systems/mx-es/wp-content/themes/ibmDigitalDesign/assets/img/anonymous.jpg'
    }, admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }, password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        },
        beforeUpdate: (user) => {
          if(user.password.length < 10){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          }
        }
      },

    });
        usuario.prototype.validPassword = function (password) {
          return bcrypt.compareSync(password, this.password);
          
        }
        return usuario;
      }
