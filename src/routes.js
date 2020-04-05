const express = require("express");
const Routes = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const Incidents = require("./controllers/IncidentsController");
const Profile = require("./controllers/ProfileController");
const Sessions = require("./controllers/SessionController");

Routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required().length(8),
    }),
  }),
  Sessions.create
);

// ONGS
Routes.get("/ongs", OngController.index);
Routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  OngController.create
);
Routes.delete("/ongs/:id", OngController.delete);

// PROFILE
Routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().length(8),
    }).unknown(),
  }),
  Profile.index
);

// INCIDENTS
Routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
    },
  }),
  Incidents.index
);
Routes.post(
  "/incidents",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().length(8),
    }).unknown(),
  }),
  Incidents.create
);
Routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().length(8),
    }).unknown(),
  }),
  Incidents.delete
);

module.exports = Routes;
