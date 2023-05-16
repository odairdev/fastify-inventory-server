import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { authenticate } from "@/http/controllers/authenticate";
import { getUserProfile } from "@/http/controllers/getUserProfile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function UsersRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        description: "Register a new user using an email and password.",
        tags: ["Users"],
        summary: "Create an user.",
        body: {
          type: "object",
          properties: {
            name: { type: "string", description: 'John Doe' },
            email: { type: "string", description: 'johndoe@email.com' },
            password: { type: "string", description: '123123' },
          },
        },
        response: {
          201: {
            description: "User created successfully",
            type: "object",
          },
          409: {
            description: "User already exists",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    register
  );

  app.post(
    "/authenticate",
    {
      schema: {
        description:
          "Authenticate user using an email and password, receiving back a token.",
        tags: ["Users"],
        summary: "Authenticate user",
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            description: "User authenticated successfully",
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  created_at: { type: "string" },
                },
              },
              token: { type: "string" },
            },
          },
          403: {
            description: "Invalid Email or Password",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    authenticate
  );

  // Authenticated Routes
  app.get(
    "/profile",
    {
      onRequest: verifyJWT,
      schema: {
        description: "Get User profile information",
        tags: ["Users"],
        summary: "Get User Profile",
        headers: {
          type: 'object',
          properties: {
            Authorization: {
              type: 'string',
              description: 'JWT token, sample: "Bearer #TOKEN#"'
            }
          }
        },
        response: {
          200: {
            description: "Provides user profile",
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  created_at: { type: "string" },
                },
              },
            },
          },
          400: {
            description: "User not found.",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    getUserProfile
  );
}
