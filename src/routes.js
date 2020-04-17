const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const OngControllers = require("./controllers/OngControllers");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngControllers.index);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngControllers.create
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().required()
    })
  }),
  IncidentController.index
);

routes.post("/incidents", IncidentController.create);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;

/*
  Rota, Recursos
  *******************
    Métodos HTTP:
    GET: Buscar uma informação do back-end
    POST: Criar uma informações do back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
  *******************
  Tipos de Parametros:
  Query Params: Parametros nomeados enviados na rota após "?" (Filtros, paginação)
  Routes Params: Parametros utilizados para identificar recursos
  Request Body: Corpo da requisição, utilizado para criar ou alterar recursos 
*/
