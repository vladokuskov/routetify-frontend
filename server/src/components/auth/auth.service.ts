import fs from "fs";
import bcrypt from "bcrypt";
import { getUser } from "@core/helpers/getUser";
import { User } from "./auth.interface";
import path from "path";
import ServerError from "@core/instances/ServerError";

const login = async (email: string, password: string) => {
  try {
    // Check if email is exist
    const user = await getUser(email);

    if (!user) {
      throw new ServerError("No user found with this email.", 404);
    }

    // Validate hashed and user password.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    } else {
      throw new ServerError("The password is not valid.", 422);
    }
  } catch (error) {
    if (error instanceof ServerError) {
      throw new ServerError(error.message, error.code || 501);
    }
  }
};

const register = async (user: User) => {
  try {
    const users: User[] = [];

    const databasePath = path.join(__dirname, "../../database/db.json");

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const newUser: User = {
      email: user.email,
      password: hashedPassword,
      username: user.username,
    };

    users.push(newUser);

    // Making deep copy and converting to JSON format, where null is replace item and '2' is white space
    const updatedUsers = JSON.stringify(users, null, 2);

    // Updating local DB, can be replaced later with another abstraction.
    fs.writeFileSync(databasePath, updatedUsers, "utf-8");

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      throw new ServerError(error.message, error.code || 501);
    }
  }
};

export { login, register };
