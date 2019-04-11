// //lib usada para manipulaçao de arquivos
// const multer    = require('multer');
// const path      = require('path');
// const crypto    = require('crypto');

// multer.exports = {
//     dest: path.resolve(__dirname, '..', '..', 'tmp'),
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
//         },
//         filename: (req, file,cb) => {
//             //gero 16 bytes de caracteres aleatorios
//             crypto.randomBytes(16, (err, hash) => {
//                 if(err) cb (err);
//                 // cria uma propriedade key com uma string unica seguida
//                 // de um - e depois o nome original do arquivo.
//                 file.key = `${hash.toString('hex')}-${file.originalname}`;
//                 cb(null, file.key);
//             })
//         }
//     })
// };
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
};