require('newrelic');
const express = require('express');
const app = express();
const promClient = require('prom-client');
const pg = require('pg');
const axios = require('axios');

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'fp_db',
    password: 'admin',
    port: 5432
});

client.connect();

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await client.query(query, [productId]);
    res.json(result.rows[0]);
});

app.get('/product', async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.json(response.data);
});

const PORT = 3005;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;