const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: "Producto 1", price: 19.99, image: "/api/placeholder/150/150" },
  { id: 2, name: "Producto 2", price: 29.99, image: "/api/placeholder/150/150" },
  { id: 3, name: "Producto 3", price: 39.99, image: "/api/placeholder/150/150" }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

module.exports = router;