import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function validateJwt(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];
  const secretKey = process.env.SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized" });
  }
}
