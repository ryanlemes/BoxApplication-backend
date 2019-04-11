const express           = require('express');
const routes            = express.Router();
const multer            = require('multer');
const multerConfig      = require('./config/multer');
const BoxController     = require('./controllers/BoxController');
const FileController    = require('./controllers/FileController');

/**
 *  req --> representa a requisitaçao feita para o servidor
 *          contem as informacoes relacionadas a requisicao
 *          ex.: se algum usuario esta enviando qualquer coisa 
 *          como um parametro, arquivo, parametro via url tudo isso fica no req.
 * 
 *  res --> representa a resposta que vamos dar ao cliente. utilizamos sempre para
 *          retornar algo para o cliente.
 * 
 * Middleware --> interceptador( ntercepa uma requisicao, 
 *                ou seja toda vez que acessar a rota obrigatoriamente vai passar por essa funçao)
 */
routes.get("/test", (req, res) => { 
    return res.send("Hello World");
})

/**
 * GET      --> usado toda vez que vai buscar algo; 
 * POST     --> usado toda vez que for adicionar algo;
 * PUT      --> usado toda vez que for editar algo;
 * DELETE   --> usado toda vez que for deletar algo.
 */

routes.post("/boxes", BoxController.store);

/**  Definicao deste multer
 *   --> primeiro  deve se passar as configuraçoes do multer
 *   --> depois selecionar single caso deseje passar um arquivo por vez
 *   array caso deseje passar mais de um arquivo por vez
 *   --> o "file" define o nome(key) do input que sera passado
 * */
routes.post(
    "/boxes/:id/files", 
    multer(multerConfig).single("file"), 
    FileController.store
);

routes.get("/boxes/:id", BoxController.show);

module.exports = routes;// Exporta alguma informaçao do arquivo (neste caso esta exportando a variavel routes para ser usada em outro lugar)