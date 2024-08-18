import Joi from "joi";

const userSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });
  
  export function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    next();
  }