const express = require("express");
const router = express.Router();

router.get(('/home'), (req, res) => {
    res.send('Bienvenue sur la page home');
})


module.exports = router;