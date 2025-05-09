import jwt from "jsonwebtoken";

interface User {
  name: string;
}

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export const signJwt = (payload: object) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyJwt = (token: string): User | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as User;
  } catch {
    return null;
  }
};
