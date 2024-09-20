const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Configura MercadoPago con tu Access Token
mercadopago.configure({
    access_token: 'TEST-2390657157268363-091923-af621e8a24d1cb713d27572741a7813b-189212548'
});

router.post('/create_preference', (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": "http://localhost:8080/success",
            "failure": "http://localhost:8080/failure",
            "pending": "http://localhost:8080/pending"
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        }).catch(function (error) {
            console.log(error);
            res.status(500).send('Something went wrong');
        });
});

module.exports = router;