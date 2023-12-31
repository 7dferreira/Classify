const express = require("express");
const router = express.Router();
const db = require("../models");
const Category = db.category;


router.get("/subcat", async(req, res) => {
    try {
        const response = await Category.findAll({
            attributes: ['ID', 'categoryName', ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


router.get("/Cat/:id", async(req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Vehicle with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehicle with id=" + id
            });
        });
});

router.get("/listBYcat/:id", async(req, res) => {
    const { QueryTypes } = require('sequelize');
    const id = req.params.id;

    const response = await db.sequelize.query(`Select category.categoryName, subcategory.SubcategoryName 
    from category inner join subcategory on category.id=subcategory.categoryID where category.ID=${id}`, { type: QueryTypes.SELECT });
    res.status(200).json(response);
});

router.get("/listar", async(req, res) => {
    try {
        const response = await db.subcategory.findAll({ include: { model: Category, required: true } });
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;