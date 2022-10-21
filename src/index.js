const app = require('../src/config/server');
require('./routes/rutas');
require('colors');



app.listen(app.get('Puerto'), (req, res)=>{
    console.log('Servidor Iniciado'.bgGreen)
})