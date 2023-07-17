import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.listen(9090, () => console.log("Server was run!"));

export default app;
