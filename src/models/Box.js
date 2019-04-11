const mongoose = require("mongoose");

const Box = new mongoose.Schema({
    //Setar aqui os campos do meu schema 
    title: {
        type: String,
        required:true,
    },
    files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}]
}, {
    timestamps: true
});


module.exports = mongoose.model("Box", Box);