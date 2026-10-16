import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!expiresIn) {
    throw new Error("JWT_EXPIRES_IN is not defined");
  }

  const token = jwt.sign({ userId, role }, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });

  return token;
};

export default generateToken;
