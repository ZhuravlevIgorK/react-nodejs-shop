import express from "express";
import dbProductsDefault from "../db/products.js";

let dbProducts = [...dbProductsDefault];

const router = express.Router();

router.get("/", (req, res) => {
    const categoryId = req.query.categoryId;
    if (categoryId) {
        const procucts = dbProducts.filter(item => item.categoryId === +categoryId);
        return res.json(procucts);
    } 
    return res.json(dbProducts);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const product = dbProducts.find(item => item.id === +id);
    if (product) {
        return res.json(product);
    } else {
        return res.status(404).json({message: `Такой продукт с ID = ${id} - нет!`})
    }
});


router.post("/", (req, res) => {
    const {categoryId, title, image, price} = req.body;
    const product = dbProducts.find(item => item.title === title);
    if (product) {
        return res.status(400).json({message: `Продукт ${product.title} - уже существует!`});
    } else {
        dbProducts.push({id: dbProducts.length + 1, categoryId, title, image, price});
        return res.json({message: `Продукт ${title} была создана!`});
    }
});

router.patch("/", (req, res) => {
    const {categoryId, id, title, image, price} = req.body;
    dbProducts = dbProducts.map(item => {
        if (+item.id === +id) {
            return {...item, categoryId, id, title, image, price};
        }
        return item;
    });
    return res.json({message: `Продутк был изменен!`});
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const indexProduct = dbProducts.findIndex(item => item.id === id);
    if (indexProduct === -1) {
        return res.status(404).json({message: `Продукт с ID = ${id} не существует!`});
    } else {
        dbProducts.splice(indexProduct, 1);
        return res.json({message: `Продукт была удален!`});
    }
});

export default router;
