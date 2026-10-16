import Joi from "joi";

const createProjectValidator = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().max(500).allow(""),
});

const updateProjectValidator = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().max(500).allow(""),
}).min(1);

export { createProjectValidator, updateProjectValidator };
