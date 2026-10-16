import Joi from "joi";

interface ISignupInput {
  name:string;
  email:string;
  password: string
}

interface ILoginInput {
  email:string;
  password: string
}

const signupValidator = Joi.object<ISignupInput>({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const loginValidator = Joi.object<ILoginInput>({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

export { signupValidator, loginValidator };
