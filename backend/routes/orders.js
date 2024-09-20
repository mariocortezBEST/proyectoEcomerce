const express = require('express');
const router = express.Router();

let orders = [];

router.post('/', (req, res) => {
  const order = {
    id: orders.length + 1,
    items: req.body.items,
    total: req.body.total,
    date: new Date()
  };
  orders.push(order);
  res.status(201).json(order);
});

router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;