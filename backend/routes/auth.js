import express from "express";
import dbUser from "../db/users.js";

const router = express.Router();

router.post("/register", (req, res) => {
    const {login, password, email} = req.body;
    const user = dbUser.find((item) => item.login.toLowerCase() === login.toLowerCase() || item.email.toLowerCase() === email.toLowerCase());
    if (user) {
        return res.status(400).json({message: `Пользователь уже с таким email: ${email} или логином ${login} зарегистрирован!`})
    } else {
        dbUser.push({id: dbUser.length + 1, login, password, email});
        return res.status(201).json({message: "Пользователь зарегистрирован!"})
    }
});

router.post("/sign-in", (req, res) => {
    const {login, password} = req.body;
    const user = dbUser.find((item) => item.login === login && item.password === password);
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(401).json({message: `Логин: ${login} или пароль: ${password} не совпадают`});
    }
});

router.get("/sign-out", (req, res) => {
    return res.json(200);
});

router.get("/users", (req, res) => res.json(dbUser))

export default router;