import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async (email: string, username: string) => {
  const token = jwt.sign({ email, username }, process.env.TOKEN_KEY as string, {
    expiresIn: "10h",
  });

  return token;
};
