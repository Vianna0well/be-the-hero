const express = require('express');
const Routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const Incidents = require('./controllers/IncidentsController');
const Profile = require('./controllers/ProfileController');
const Sessions = require('./controllers/SessionController')

Routes.post('/sessions', Sessions.create)

Routes.get('/ongs', OngController.index);
Routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) , OngController.create);

Routes.get('/profile', Profile.index);

Routes.get('/incidents', Incidents.index);
Routes.post('/incidents', Incidents.create);
Routes.delete('/incidents/:id', Incidents.delete);

module.exports = Routes;