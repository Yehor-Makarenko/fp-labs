const express = require('express');
const promClient = require('prom-client')
const app = express();

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    
    res.json({
        id: productId,
        name: `${productId} name`
    });
});
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});