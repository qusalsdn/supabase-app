import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export const signJwt = (payload: object) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyJwt = (token: string) => {
  try {
    if (SECRET_KEY) return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};
