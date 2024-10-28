import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/conn.js"

const User = sequelize.define('User',{
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

},
{
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, 10);
        },
    },
});
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default User;
