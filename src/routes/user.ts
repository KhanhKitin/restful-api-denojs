import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/user.ts";

const router = new Router();

const user_v1 = '/api/v1/users';

router
  .get(user_v1, getUsers)
  .get(`${user_v1}/:id`, getUser)
  .post(user_v1, createUser)
  .put(`${user_v1}/:id`, updateUser)
  .delete(`${user_v1}/:id`, deleteUser);
    
export default router
