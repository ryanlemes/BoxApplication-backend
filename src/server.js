//Most important file
//Arquivo de Entrada da applicacao
const express   = require("express");
const mongoose  = require("mongoose");
const path      = require('path'); 
const cors      = require('cors');
const app       = express();

//Isso fala que todo mundo pode acessar esta aplicacao
app.use(cors());

const server    = require('http').Server(app);
const io        = require('socket.io')(server);

io.on("connection", socket =>{
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
});

mongoose.connect(
    'mongodb+srv://ryanlemes:ryanlemes@cluster0-n0se4.mongodb.net/ryanlemes?retryWrites=true', 
    {
        useNewUrlParser: true
    }
);

app.use((req,res, next) => {
    req.io = io;

    //Necessita deste next pois este middleware e global, logo sempre que
    // passar por aqui ele vai ficar preso caso n'ao exista este next, para
    // dar continuidade no que deve ser feito.
    return next();
});

// app.use => serve para cadastrar algum modulo dentro do express
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // permite que envie arquivos em requisiçoes
app.use(require('./routes'))// Incluindo o arquivo de rotas ao servidor 

//toda vez que receber uma requisicao na rota files, vai passar pela express.static
//ou seja toda vez que acessar o caminho files, vai redirecionar para a parte fisica onde se encontra os arquivos da
// pasta files.
app.use('/files',express.static(path.resolve(__dirname, '..', 'tmp')));

//consegue ouvir tanto requisicoes http como requisicoes websocket devido trocar
// app para server
server.listen('3334'); //Passa uma porta