import express from "express";
import dbCategories from "../db/categories.js";

const router = express.Router();

router.get("/", (req, res) => {
    return res.json(dbCategories);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const category = dbCategories.find(item => item.id === +id);
    if (category) {
        return res.json(category);
    } else {
        return res.status(404).json({message: `Такой категории с ID = ${id} - нет!`})
    }
});


router.post("/", (req, res) => {
    const {title} = req.body;
    const category = dbCategories.find(item => item.title === title);
    if (category) {
        return res.status(400).json({message: `Категория ${category.title} - уже существует!`});
    } else {
        dbCategories.push({id: dbCategories.length + 1, title});
        return res.json({message: `Категория ${title} была создана!`});
    }
});

router.patch("/", (req, res) => {
    const {id, title} = req.body;
    const indexSelected = dbCategories.findIndex(item => item.id === id);
    if (indexSelected === -1) return res.status(400).json({message: `Категория ${id} - не существует!`});
    dbCategories[indexSelected].title = title;
    return res.status(200).json();
})

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const indexCategory = dbCategories.findIndex(item => item.id === id);
    if (indexCategory === -1) {
        return res.status(404).json({message: `Категория с ID = ${id} не существует!`});
    } else {
        dbCategories.splice(indexCategory, 1);
        return res.json({message: `Категория была удалена!`});
    }
});

export default router;
