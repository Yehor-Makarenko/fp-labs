const express = require('express');
const NodeCache = require('node-cache');
const app = express();

const cache = new NodeCache({ stdTTL: 10, checkperiod: 1 });

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    console.time("Response time " + productId);

    const cachedProduct = cache.get(productId);
    
    if (cachedProduct) {        
        console.log("From cache")
        console.timeEnd("Response time " + productId);
        return res.json({
            source: 'cache',
            id: productId,
            name: cachedProduct.name
        });            
    }

    const product = await new Promise(resolve => {
        setTimeout(() => resolve({name: "Phone"}), 1000);
    })

    cache.set(productId, product);
    console.timeEnd("Response time " + productId);

    res.json({
        source: 'server',
        id: productId,
        name: product.name
    }); 
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});