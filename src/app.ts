import fastify from "fastify";
import { UsersRoutes } from "./routes/users";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(UsersRoutes, {
  prefix: '/users'
})

app.setErrorHandler((error, request, reply) => {
  if(error instanceof ZodError) {
    return reply
      .status(400)
      .send({
        message: 'Validation Error',
        issues: error.format()
      })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal server error.'})
})

export { app }