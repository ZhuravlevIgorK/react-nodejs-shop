import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.use("/*", express.static(path.resolve(__dirname, "../frontend/build")));
// app.get('*', function (req, res) {
//   const filepath = path.resolve(__dirname, "../frontend/build"+req.path);
//   if (fs.existsSync(filepath)) {
//     res.sendFile(filepath);
//     // Test
//   } 
//   res.sendFile(path.resolve(__dirname, "../frontend/build"));
// });
app.use("/*", (req, res, next) => {
  const filepath = path.resolve(__dirname, "../frontend/build"+req.path);
  if (fs.existsSync(filepath)) {
    return res.sendFile(filepath);
  } 
  next();
})


app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);



 app.listen(9090, () => console.log("Server was run!"));

export default app;
