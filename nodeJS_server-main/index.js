require("dotenv").config();

const express = require ("express");
const app = express();
const port = process.env.PORT;
const homeController = require("./controller/HomeController");
const userController = require("./controller/UserController");
const articleController = require("./controller/ArticleController");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connection à la bdd établie"))
    .catch((error) => console.log(error));

app.use(express.json());
app.listen(port, () => console.log(`le serveur répond sur le port ${port}`));
app.use(cors());



app.use('/', homeController);
app.use('/user', userController);
app.use('/article', articleController);