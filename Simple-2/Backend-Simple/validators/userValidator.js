import Joi from "joi";

const signupValidator = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).max(20).required(),
});

const loginValidator = Joi.object({
  email: Joi.string().trim().email().required(),

  password: Joi.string().required(),
});

export { signupValidator, loginValidator };
