const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

router.post(('/register'), async(req, res) => {
    try {
        const searchUser = await User.findOne({ login: req.body.login});
        if(searchUser){
            return res
                .status(403)
                .json({message: `l'utilisateur ${req.body.login} existe déjà`});
        }
        const user = new User(req.body);
        const newUser = await user.save();
        return res
            .status(201)
            .json({message: `l'utilisateur ${newUser.login} a été créé`});
    } catch(err) {
        return res
        .status(500)
        .json({message: err.message})
    }
});

router.post("/login", async (req, res) => {
    try{
        /*
        - récupérer l'user
        - vérifier s'il existe
        - vérifier validité mdp
        - créer le token
        - envoyer le token vers front
        */
        const user = await User.findOne({login: req.body.login});
        if(!user){
            return res
                .status(400)
                .json({message: "user non trouvé"})
        }
    
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res
                .status(400)
                .json({message: "mdp incorrect"});
        }

        const payload = {
            id: user._id,
            login: user.login,
            roles: user.roles,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY);
        console.log(token);
        
        return res
            .status(200)
            .json({message: "authentification réussie", token: token});
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message});
    }
})

router.get("/all", auth,  async (req, res) => {
    try{
        if(req.payload.roles.includes("admin")){
            const usersList = await User.find().sort("login");
            return res
                .status(200)
                .json({result: usersList});
        }
        return res
        .status(403)
        .json({message: "vous n'êtes pas autorisé"})

    } catch(err) {
        return res
          .status(500)
          .json({message: err.message});
    }
})

router.get("/profile", auth, async (req, res) => {
    try{
            const user = await User.findById(req.payload.id);
            return res
                .status(200)
                .json({result: user})
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.put("/profile/edit", auth, async (req, res) => {
    try{
            await User.findByIdAndUpdate(req.payload.id, req.body);
            return res
                .status(200)
                .json({result: "profil modifié"})
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})


router.get("/:id", auth, async (req, res) => {
    try{
        if(req.payload.roles.includes("admin")){
            const user = await User.findById(req.params.id);
            if(!user) {
                return res
                    .status(404)
                    .json({message: "l'utilisateur recherché n'existe pas)"})
            }
            return res
                .status(200)
                .json({result: user})
        }
        return res
            .status(403)
            .json({message: "vous n'êtes pas autorisé"})
    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.put("/edit/:id", auth, async (req, res) => {
    try{
        if(req.payload.roles.includes("admin")){
            const user = await User.findById(req.params.id);
            if(!user) {
                return res
                    .status(404)
                    .json({message: "l'utilisateur recherché n'existe pas)"})
            }
            await user.updateOne(req.body)
            return res
                .status(200)
                .json({message: "utilisateur modifié"})
        }
        return res
        .status(403)
        .json({message: "vous n'êtes pas autorisé à effectuer des modifications"})

    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    try{
        if(req.payload.roles.includes("admin")){
            const user = await User.findById(req.params.id);
            if(!user) {
                return res
                    .status(404)
                    .json({message: "l'utilisateur recherché n'existe pas)"})
            }
            await user.deleteOne()
            return res
                .status(200)
                .json({message: "utilisateur supprimé"})
        }
        return res
        .status(403)
        .json({message: "vous n'êtes pas autorisé à effectuer des modifications"})

    } catch(err) {
        return res
            .status(500)
            .json({message: err.message})
    }
})



module.exports = router;