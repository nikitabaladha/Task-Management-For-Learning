import Joi from "joi";

interface ICreateProjectValidator{
  name: string;
  description?:string;
}

interface IUpdateProjectInput{
  name?: string;
  description?:string;
}

const createProjectValidator = Joi.object<ICreateProjectValidator>({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().max(500).allow(""),
});

const updateProjectValidator = Joi.object<IUpdateProjectInput>({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().max(500).allow(""),
}).min(1);

export { createProjectValidator, updateProjectValidator };
