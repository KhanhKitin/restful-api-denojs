import DB from "../common/DataConnection.ts";
import { User } from "../models/user.ts";

type UserData = Pick<User, "username" | "password" | "address" | "isAdmin">;

// Create user
const insertUser = async (data: UserData): Promise<User | undefined> => {
  return DB.collection("users").insertOne({
    username: data.username,
    password: data.password,
    address: data.address,
    isAdmin: data.isAdmin || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

// Get all users
const findAllUser = async (): Promise<User[]> => {
  return DB.collection("users").find();
};

// Get user
const findUser = async (userId: string): Promise<User | undefined> => {
  return DB.collection("users").findOne({ _id: { $oid: userId } });
};

// Update user
const updateOneUser = async (
  userId: string,
  UserData: UserData,
): Promise<void> => {
  DB.collection("users").updateOne(
    { _id: { $oid: userId } },
    {
      $set: {
        username: UserData.username,
        password: UserData.password,
        address: UserData.address,
        isAdmin: UserData.isAdmin,
        updatedAt: new Date(),
      },
    },
  );
};

// Delete user
const deleteOneUser = async (userId: string): Promise<void> => {
  DB.collection("users").deleteOne({ _id: { $oid: userId } });
};

export {
  insertUser,
  findAllUser,
  findUser,
  updateOneUser,
  deleteOneUser,
};
