import { getUser } from "@core/helpers/getUser";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters long."),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters long."),
  username: z.string().min(1, "Username should be at least 1 character long."),
});

const verifyAuthRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "GET") {
      const { email, password } = req.body;

      loginSchema.parse({ email, password });

      next();
    } else if (req.method === "POST") {
      const { email, password, username } = req.body;

      registerSchema.parse({ email, password, username });

      const user = await getUser(email);

      if (user) {
        res.status(403);
        res.json({ error: "Email already exist." });
      }

      next();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(422);
      res.json({ error: error.issues[0].message });
    } else {
      res.status(501);
    }
  }
};
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];
    if (token == null || token === undefined) {
      return res.status(401).json({ error: "Token not found." });
    }

    jwt.verify(token, process.env.TOKEN_KEY as string, (err, user) => {
      if (err) return res.status(403).json({ error: "Token is expired." });
      req.body = user;
      next();
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.json({ error: "Internal server error." });
  }
};

export { authenticate, verifyAuthRequest };
