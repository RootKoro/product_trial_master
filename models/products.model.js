import { DataTypes } from 'sequelize';
import { sequelize } from "../config/db.conf.js"

export const Product = sequelize.define('Product', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.STRING,
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    internalReference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shellId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inventoryStatus: {
        type: DataTypes.ENUM("INSTOCK" , "LOWSTOCK" , "OUTOFSTOCK"),
        allowNull: false,
    },
    rating: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
})