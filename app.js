require('dotenv').config();
import express from 'express';
import { errorHandler } from './middleware/error.handler';
import productsRouter from './routes/products.route';

let app = express();
const port  = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Product Trial Master, solved by Cyr Mathieu GUEYE!');
});

app.use(express.json());
app.use("api/v1/products", productsRouter)
app.use(errorHandler);

app.listen(port, () => console.log('Server listening on port ' + port));
