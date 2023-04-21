const express = require("express");
const router = express.Router();
const db = require('../models');
const Advert_vehicle = db.Advert_vehicle;

router.post("/Advert", async(req, res) => {
    const { vehicleID } = req.body;

    try {
        console.log(req.body);
        await Advert_vehicle.create({
            vehicleID: vehicleID
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    Advert_vehicle.findByPk(id)
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
        const response = await Advert_vehicle.findAll({
            attributes: ['ID', 'vehicleID']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = router;