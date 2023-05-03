const express = require("express");
const router = express.Router();
const db = require('../models');
const PublishAD = db.publishAD;
const { where } = require("sequelize");


router.post("/publishad", async(req, res) => {
    const { vehicleID, clientID, publishAD_date } = req.body;

    try {
        console.log(req.body);
        const response = await PublishAD.create({
            vehicleID: vehicleID,
            clientID: clientID,
            publishAD_date: publishAD_date
        });

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});

router.get("/listAllAD", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date  
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});


router.get("/listAD/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`
    Select user.fullname, user.streamChatUserId, vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    inner join User on User.id=client.userID
    where vehicle.id=${id};`, { type: QueryTypes.SELECT });

    res.status(200).json(response);
});

router.get("/listAllADPriceASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    order by vehicle.price asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listAllADDateASC", async(req, res) => {
    const { QueryTypes } = require('sequelize');

    const response = await db.sequelize.query(`Select vehicle.image, category.categoryName , subcategory.SubcategoryName , vehicle.price,
    vehicle.license, vehicle.year, vehicle.kms, vehicle.brand as'Marca', vehicle.model as 'Modelo', vehicle.fuel as 'Combustivel', 
    vehicle.power, vehicle.num_seats as 'n. lugares', client.locality as 'Localidade', publishad.publishAD_date   
    from vehicle 
    inner join subcategory on vehicle.subcategoryID=subcategory.ID
    inner join category on subcategory.categoryID=category.ID
    inner join publishAD on  vehicle.ID=publishAD.vehicleID
    inner join client on  publishAD.clientID=client.ID
    order by publishad.publishAD_date asc;`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});




module.exports = router;