import dotenv from 'dotenv';
import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';
import errorHandler from './middleware/errorhandler.js';
import productsRouter from './routes/products.route.js';
import { sequelize } from './config/db.conf.js';
import { Product } from './models/products.model.js';

dotenv.config();
sequelize.authenticate()
    .then(() => console.log("Connection to the database established."))
    .catch(e => console.error("Error connecting to the database"))

let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = new Product(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => console.log("Database syncrhonized successfully!"))
    .catch(e => console.error(e));

let app = express();
const port  = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productsRouter)
app.use(errorHandler);

app.get('/', function(req, res) {
    res.send('Product Trial Master, solved by Cyr Mathieu GUEYE!');
});

app.listen(port, () => console.log('Server listening on port ' + port));
