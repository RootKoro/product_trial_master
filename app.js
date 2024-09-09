import dotenv from 'dotenv';
import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';
import errorHandler from './middleware/errorhandler.js';
import productsRouter from './routes/products.route.js';
import { sequelize } from './config/db.conf.js';
import { Product } from './models/products.model.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { format } from 'sequelize/lib/utils';

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
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product Trial Master",
            version: "0.1",
        },
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    required: [
                        'code',
                        'name',
                        'image',
                        'category',
                        'price',
                        'quantity',
                        'internalReference',
                        'shellId',
                    ],
                    properties: {
                        id: { type: 'number' },
                        code: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string' },
                        category: { type: 'string' },
                        price: { type: 'number' },
                        quantity: { type: 'number' },
                        internalReference: { type: 'string' },
                        shellId: { type: 'number' },
                        inventoryStatus: { 
                            type: 'string',
                            enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
                        },
                        rating: { type: 'number' },
                        createdAt: { 
                            type: 'string',
                            format: 'datetime',
                        },
                        updatedAt: { 
                            type: 'string',
                            format: 'datetime',
                        },
                    }
                }
            }
        }
    },
    apis: ["./routes/*.route.js"],
}

const swaggerSpec = swaggerJsdoc(options)

app.use(express.json());
app.use("/products", productsRouter)
app.use(errorHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', function(req, res) {
    res.send('Product Trial Master, solved by Cyr Mathieu GUEYE!');
});
app.get('docs.json', (res, req) => {
    res.header('Content-Type', 'application/json');
    res.send(swaggerSpec);
})

app.listen(port, () => {
    console.log('Server listening on port ' + port);
    console.log(`Swagger Documentation available at http://localhost:${process.env.PORT}/docs`);
});
