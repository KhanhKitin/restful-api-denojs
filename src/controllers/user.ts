import {
  insertUser,
  findAllUser,
  findUser,
  updateOneUser,
  deleteOneUser,
} from "../service/user.ts";

// Create a User
const createUser = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid user data" };
    return;
  }
  const {
    value: { username, password, address, isAdmin },
  } = await request.body();

  if (!username || !password) {
    response.status = 422;
    response.body = {
      msg: "Incorrect user data. username and password are required",
    };
    return;
  }
  let user = await insertUser({ username, password, address, isAdmin });
  response.status = 201;
  response.body = { msg: "User created", user };
};

const getUsers = async ({ response }: { response: any }) => {
  const users = await findAllUser();
  response.status = 200;
  response.body = {success: true, data: users};
};

const getUser = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const id = params.id;
  if (!id) {
    response.status = 400;
    response.body = { success: false, error: "Id params is required" };
  }
  const user = await findUser(id);
  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      error: `User does not exist`,
    };
    return;
  }
  response.status = 200;
  response.body = {success: true, data: user};
};

// Update user
const updateUser = async  (
  { params, request, response }: { params: { id: string }; request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid user data" };
    return;
  }
  const {
    value: { username, password, address, isAdmin },
  } = await request.body();
  const id = params.id;

  const user = await findUser(id);

  if(!user){
    response.status = 404;
    response.body = {
      success: false,
      error: `User not found`,
    };
    return;
  }
  await updateOneUser(id, { username, password, address, isAdmin } );
  response.status = 200;
  response.body = {success: true, data: user};

}

// Delete user
const deleteUser = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const id = params.id;
  if (!id) {
    response.status = 400;
    response.body = { success: false, error: "Invalid user id" };
  }

  const user = await findUser(id);

  if (!user) {
    response.status = 404;
    response.body = {
      success: false,
      error: `User not found`,
    };
    return;
  }
  await deleteOneUser(id);
  response.status = 200;
  response.body = { msg: "Delete User Success!" };
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
