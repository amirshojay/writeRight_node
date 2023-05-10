const Joi = require("joi");

const passwordSchema = Joi.string()
  .pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  )
  .message(
    "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long"
  );

const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: passwordSchema,
  wordCount: Joi.number().integer().min(0),
  debt: Joi.number().integer().min(0),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const registerValidation = (data) => {
  return registerSchema.validate(data);
};

const loginValidation = (data) => {
  return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
