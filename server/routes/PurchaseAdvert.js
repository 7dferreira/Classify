const express = require("express");
const router = express.Router();
const db = require('../models');
const PurchaseAdvert = db.purchase_Advert;

router.post("/purchaseadvert", async(req, res) => {
    const { publishadID } = req.body;

    try {
        console.log(req.body);
        const response = await PurchaseAdvert.create({
            publishadID: publishadID
        });

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/purchase/:id", async(req, res) => {
    const id = req.params.id;

    PurchaseAdvert.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                console.log("error")
                res.status(404).send({
                    message: `Cannot find with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving  with id=" + id
            });
        });
});


router.get("/All", async(req, res) => {
    try {
        const response = await PurchaseAdvert.findAll({
            attributes: ['ID', 'publishadID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;