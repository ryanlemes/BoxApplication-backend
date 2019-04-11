const mongoose = require("mongoose");

const File = new mongoose.Schema({
    //Setar aqui os campos do meu schema 
    title: {
        type: String,
        required:true,
    },
    path:{
        type: String,
        required: true
    }
}, {
    timestamps: true, 
    //Toda vez que algum arquivo for convertido para um objecto ou para json ele passa por um desses dois
    toObject:   { virtuals: true },
    toJSON:     { virtuals: true }
});
//campo virtual existe somente no backend, mas n e criado dentro do DB
File.virtual('url').get(function() {
     return `http://localhost:3334/files/${encodeURIComponent(this.path)}`;
})


module.exports = mongoose.model("File", File);