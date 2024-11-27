const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient({
  port: 6379,  
});

client.on('connect', () => {
  console.log('COnnected to Redis');
})

client.connect().then(() => {
  const cache = async (req, res, next) => {
    const productId = req.params.productId;
    const data = await client.get(productId);
    if (data !== null) {
      cachedProduct = JSON.parse(data);
      console.log('Serving from Redis cache');
      return res.json({
        source: 'cache',
        id: productId,
        name: cachedProduct.name
      }); 
    }
    next();
  }
  
  app.get('/products/:productId', cache, async (req, res) => {
    const productId = req.params.productId;
    
    const product = await new Promise(resolve => {
      setTimeout(() => resolve({name: "Phone"}), 1000);
    })
    console.log(product)
  
    client.setEx(productId, 3600, JSON.stringify(product));
  
    res.json({
      source: 'server',
      id: productId,
      name: product.name
    }); 
  });

  app.use('/static', express.static('lab5/public'));
  
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
})