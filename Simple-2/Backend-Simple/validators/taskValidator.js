import Joi from "joi";

const createTaskValidator = Joi.object({
  title: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(2).max(1000).allow(""),
  projectId: Joi.string().trim().required(),
  assignedToId: Joi.string().trim().required(),
  priority: Joi.string().valid("High", "Medium", "Low").default("Medium"),
  status: Joi.string()
    .valid("Pending", "In Progress", "Completed")
    .default("Pending"),
});

const updateTaskValidator = Joi.object({
  title: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(2).max(1000).allow(""),
  projectId: Joi.string().trim(),
  assignedToId: Joi.string().trim(),
  priority: Joi.string().valid("High", "Medium", "Low"),
  status: Joi.string().valid("Pending", "In Progress", "Completed"),
}).min(1);

const updateMyTaskValidator = Joi.object({
  status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
});

export { createTaskValidator, updateTaskValidator, updateMyTaskValidator };
