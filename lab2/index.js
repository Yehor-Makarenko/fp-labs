const express = require('express');
const app = express();
app.get('/products/:productId', (req, res) => {
    const a = 5;
    const b = 7;
    const productId = req.params.productId;
    
    res.json({
        id: productId,
        name: `${productId} name`
    });
});
const PORT = 3005;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;