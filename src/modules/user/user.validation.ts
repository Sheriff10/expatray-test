import Joi from "joi";

export const registerUserSchma = Joi.object({
  name: Joi.string().alphanum().min(3).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const loginUserSchma = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().min(2).max(50).optional(),
  address: Joi.object({
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});
