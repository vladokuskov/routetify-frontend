import { Request, Response } from "express";
import httpStatus from "http-status";
import { login, register } from "./auth.service";
import { generateToken } from "@core/helpers/generateToken";
import { User } from "./auth.interface";
import ServerError from "@core/instances/ServerError";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await login(email, password);

    if (response) {
      const token = await generateToken(response.email, response.username);

      res.status(httpStatus.OK);

      res.header("Authorization", token).json({
        email: response.email,
        username: response.username,
      });
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.code || 500);
      res.send({ error: error.message });
    }
  }
};

const registerUser = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  try {
    const isRegistrationConfirmed = await register(user);

    if (isRegistrationConfirmed) {
      const token = await generateToken(user.email, user.username);

      res.status(httpStatus.OK);

      res.header("Authorization", token).json({
        email: user.email,
        username: user.username,
      });
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.code || 500);
      res.send({ error: error.message });
    }
  }
};

const getMe = async (req: Request, res: Response) => {
  // Get information about current user, using token
  try {
    const { email, username } = req.body;
    res.status(httpStatus.OK);

    res.json({ email: email, username: username });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.send({ error: error.message });
  }
};

export { loginUser, registerUser, getMe };
