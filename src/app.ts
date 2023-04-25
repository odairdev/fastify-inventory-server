import fastify from "fastify";
import { UsersRoutes } from "./routes/users";

const app = fastify()

app.register(UsersRoutes, {
  prefix: '/users'
})

export { app }