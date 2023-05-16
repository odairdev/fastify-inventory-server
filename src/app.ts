import fastify from "fastify";
import { UsersRoutes } from "./routes/users";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { ProductsRoutes } from "./routes/products";
import { OrderRoutes } from "./routes/orders";
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(fastifyCors, {
  methods: ['GET', 'PUT', 'POST', 'DELETE']
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Inventory Server API',
      description: 'Fastify Inventory Server API',
      version: '1.0.0'
    },
  }
})

app.register(fastifySwaggerUI, {
  routePrefix: '/api-docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true,
})

app.register(UsersRoutes, {
  prefix: '/users'
})
app.register(ProductsRoutes, {
  prefix: '/products'
})

app.register(OrderRoutes, {
  prefix: '/orders'
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