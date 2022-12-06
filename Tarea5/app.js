import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";

const app = express();

let contactos = [];

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

fetch("http://www.raydelto.org/agenda.php")
.then(e => e.json())
.then(content => contactos = content);

app.get('/Contactos', (req, res) => {

    fetch("http://www.raydelto.org/agenda.php")
    .then(e => e.json())
    .then(content => contactos = content);

    const response = {
        data: contactos
    }

    res.send(response)
})

app.post('/Contactos', (req, res) => {
    const contacto = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono
    }

    contactos.push(contacto)

    const response = {
        data: contacto,
        message: 'El contacto ha sido agregado correctamente'
    }

    res.send(response)
})


const puerto = 8080;
console.log(`Estoy escuchando en el puerto ${puerto}`);
app.listen(puerto);