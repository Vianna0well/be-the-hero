const express = require('express');
const app = express();
const { errors } = require('celebrate')
const cors = require('cors');
const Routes = require('./routes');

app.use(cors())
app.use(express.json());
app.use(Routes);
app.use(errors())

app.listen(3333);
console.log(`Servidor Iniciando na porta: 3333`);