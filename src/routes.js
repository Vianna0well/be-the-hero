const express = require('express');
const Routes = express.Router();
const OngController = require('./controllers/OngController');
const Incidents = require('./controllers/IncidentsController');
const Profile = require('./controllers/ProfileController');
const Sessions = require('./controllers/SessionController')

Routes.post('/sessions', Sessions.create)

Routes.get('/ongs', OngController.index);
Routes.post('/ongs', OngController.create);

Routes.get('/profile', Profile.index);

Routes.get('/incidents', Incidents.index);
Routes.post('/incidents', Incidents.create);
Routes.delete('/incidents/:id', Incidents.delete);

module.exports = Routes;