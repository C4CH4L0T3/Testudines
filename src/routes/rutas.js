const db = require('../config/db');
const app = require("../config/server");


app.get('/', (req, res)=>{
    res.render('../views/index')
});

app.get('/cover', (req, res)=>{
    res.render('../views/cover')
});
app.get('/find', (req, res)=>{
    res.render('../views/find')
});
app.get('/login', (req, res)=>{
    res.render('../views/login')
});
app.get('/notaPrueba', (req, res)=>{
    db.query(`SELECT * FROM usuarios u inner join notas n ON u.id = n.id_usuario;`,(err, result)=>{
        if(err){
            console.log(err)
        }else{

            res.render('../views/notaPrueba', {
                result,
                admin: req.session.admin
            })
        }
    
    })
});
app.get('/once', (req, res)=>{
    res.render('../views/once',{
        admin: req.session.rol
    })
});
app.get('/onceA', (req, res)=>{
    res.render('../views/onceA',{
        admin: req.session.rol
    })
});
app.get('/school', (req, res)=>{
    res.render('../views/school',{
        admin: req.session.rol
    })
});
app.get('/search', (req, res)=>{
    res.render('../views/search')
});
app.get('/singin', (req, res)=>{
    res.render('../views/singin')
});
app.get('/terminos', (req, res)=>{
    res.render('../views/terminos')
});
app.get('/userPrueba', (req, res)=>{
    res.render('../views/userPrueba',{
        admin: req.session.rol
    })
});
app.get('/subirN', (req, res)=>{
    db.query(`SELECT * FROM usuarios u inner join notas n ON u.id = n.id_usuario;`,(err, result)=>{
        if(err){
            console.log(err)
        }else{

            res.render('../views/subirN',{
                result,
                id_user: req.session.id,
                admin: req.session.admin
            })
        }
    })
    
});
app.get('/crearN', (req, res)=>{
    res.render('../views/crearN',{
        admin: req.session.rol
    })
});


// -------------------- CRUD ---------------------



// ----- POST METHODS ------- lOGIN

app.post('/logear', function(req, res) {
    const {correo, contraseña} = req.body;
	if (correo && contraseña) {
		db.query('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña], function(err, results,) {
			if (err) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.correo = correo;
				req.session.id = results[0].id;
				req.session.rol = results[0].rol;
				res.redirect('/school');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});



app.post('/registrar', (req, res)=>{
    const { nombre, correo, contraseña, rol} = req.body;
    db.query('INSERT INTO usuarios SET?',{
        nombre,
        correo,
        contraseña,
        rol
    }),
    res.redirect('/login');
});


app.post('/crearnota', (req, res)=>{
    const {grado, materia, nota, descripcion} = req.body;
    db.query(`INSERT INTO notas SET?`,{
        grado,
        materia,
        tipo_nota: nota,
        descripcion_nota: descripcion,
        id_usuario: req.session.id
    },(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/crearN')
        }
    })
})

app.post('/subirnota', (req, res)=>{
    const {nota, id_nota} = req.body;
    db.query(`UPDATE notas SET? WHERE id_nota='${id_nota}' `,{
        nota
    },(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/notaPrueba')
        }
    })
    console.log(nota, id_nota)
})



app.all('*', (req, res)=>{
    res.render('../views/404')
});