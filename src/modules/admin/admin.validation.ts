import Joi from "joi";

export const updateUserAdminSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().min(2).max(50).optional(),
  address: Joi.object({
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});
