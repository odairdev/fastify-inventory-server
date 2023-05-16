import { createProduct } from "@/http/controllers/createProduct";
import { ParamsType, deleteProduct } from "@/http/controllers/deleteProducts";
import { QueryType, readProducts } from "@/http/controllers/readProducts";
import { updateProduct } from "@/http/controllers/updateProduct";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function ProductsRoutes(app: FastifyInstance) {
  // Authenticated Routes
  app.post('/', {
    onRequest: verifyJWT,
    schema: {
      description: "Create a new Product",
      tags: ["Products"],
      summary: "Create a new Product",
      headers: {
        type: 'object',
        properties: {
          Authorization: {
            type: 'string',
            description: 'JWT token, sample: "Bearer #TOKEN#"'
          }
        }
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string", description: 'Hammer'},
          category: { type: "string", description: 'Tools' },
          amount: { type: "number", description: "10" },
        },
      },
      response: {
        201: {
          description: "Product created successfully.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                name: { type: "string" },
                category: { type: "string" },
                amount: { type: "number"},
                created_at: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Product already exists.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, createProduct)

  app.put('/', {
    onRequest: verifyJWT,
    schema: {
      description: "Update an existing Product info.",
      tags: ["Products"],
      summary: "Update Product Info",
      headers: {
        type: 'object',
        properties: {
          Authorization: {
            type: 'string',
            description: 'JWT token, sample: "Bearer #TOKEN#"'
          }
        }
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string", description: 'Hammer'},
          category: { type: "string", description: 'Tools' },
          amount: { type: "number", description: "10" },
        },
      },
      response: {
        200: {
          description: "Product updated successfully.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                name: { type: "string" },
                category: { type: "string" },
                amount: { type: "number"},
                created_at: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Resource not found/Product name already in use/Product amount negative",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, updateProduct)

  app.get<{ Querystring: QueryType }>('/', {
    onRequest: verifyJWT,
    schema: {
      description: "List products per page, 50 products per page.",
      tags: ["Products"],
      summary: "List Products",
      querystring: {
        type: 'object',
        required: ['page'],
        additionalProperties: false,
        properties: {
          page: { type: 'number'}
        }
      },
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
          description: "List products per page, 50 products per page.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                name: { type: "string" },
                category: { type: "string" },
                amount: { type: "number"},
                created_at: { type: "string" },
              },
            },
          },
        },
        401: {
          description: "Unauthorized access.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, readProducts)

  app.delete<{ Params: ParamsType }>('/:id', {
    onRequest: verifyJWT,
    schema: {
      description: "Delete a product using id.",
      tags: ["Products"],
      summary: "Delete Product",
      params: {
        type: 'object',
        properties: {
          id: { type: 'string'}
        }
      },
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
          description: "Product deleted successfully",
          type: 'object'
        },
        401: {
          description: "Unauthorized access.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, deleteProduct)
}