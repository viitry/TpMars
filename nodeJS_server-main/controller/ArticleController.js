const express = require ("express");
const router = express.Router();
const Article = require("../model/Article");
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../model/Article");

router.post("/new", /*auth,*/ async(req, res) => {
    try{
        /*if(req.payload.roles.includes("admin")){
            req.body.idAuthor = req.payload.id;*/
            const article = new Article(req.body);
            const newArticle = await article.save();
            return res
                .status(201)
                .json({message: "article créé", result: newArticle});
        }
        /*return res
            .status(403)
            .json({message: "vous devez avoir le rôle admin"})*/
    /*}*/ catch(error) {
        return res
        .status(500)
        .json({message: error.message});
    }
})

router.get("/all", async (req, res) => {
    try{
        const articleList = await Article.find().sort("-createdAt");
        return res
            .status(200)
            .json({result: articleList});
    } catch(err) {
        return res
          .status(500)
          .json({message: err.message});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        if(!article) {
            return res
                .status(404)
                .json({message: "l'article recherché n'existe pas)"})
        }
        return res
            .status(200)
            .json({result: article})
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.get("/byauthor/:authorId", async (req, res) => {
    try{
        const articlesList = await Article.find({idAuthor: req.params.authorId});
        return res
            .status(200)
            .json({result: articlesList})
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.put("/edit/:id", auth, async (req, res) => {
    try{
        if(req.payload.id === req.body.authorId) {
            await Article.findByIdAndUpdate(req.params.id, req.body)
            return res
                .status(200)
                .json({message: "l'article a été modifié"})
        }
        return res
            .status(403)
            .json("vous n'êtes pas autorisé à modifier cet article");
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        if(req.payload.id === article.authorId || req.payload.roles.includes("admin")) {
            await article.deleteOne();
            return res
                .status(200)
                .json({message: "l'article a été supprimé"})
        }
        return res
            .status(403)
            .json("vous n'êtes pas autorisé à supprimer cet article");
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

module.exports = router;