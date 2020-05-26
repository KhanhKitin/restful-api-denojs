import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import userRoutes from "./src/routes/user.ts";

const env = config();

const app = new Application();

app.use(async ({ response }: { response: any }, next) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  await next();
});

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
console.log(`Listening on port ${env.APP_PORT}`);
await app.listen(`${env.APP_HOST}:${env.APP_PORT}`);
