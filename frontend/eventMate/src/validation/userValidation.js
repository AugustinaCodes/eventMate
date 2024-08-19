import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label("First Name"),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label("Last Name"),
  username: Joi.string().alphanum().min(3).max(30).required().label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export function validateUser(data) {
  const result = userSchema.validate(data, { abortEarly: false });

  if (!result.error) return null;

  const errors = {};
  result.error.details.forEach((err) => {
    errors[err.path[0]] = err.message;
  });

  return errors;
}
