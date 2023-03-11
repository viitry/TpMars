const mongoose = require("mongoose");
const User = require("./User")

const articleSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },
        contenu: {
            type: String,
            required: true,
        },/*
        login: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User
        }*/
    },{
        timestamps: true
    }
);
const articleModel = mongoose.model("Article", articleSchema);
module.exports = articleModel;