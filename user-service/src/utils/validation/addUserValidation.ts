import Joi from "joi";

export const addUserValidation = Joi.object({
  firstName: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/))
    .required(),
});
