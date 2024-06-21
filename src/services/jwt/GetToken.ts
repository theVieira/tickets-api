import { Request } from "express";

export function getToken(req: Request) {
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const token = authorization.split(" ")[1];
    return token;
  } else {
    throw new Error("autorization error");
  }
}
