import { createOrder } from "@/http/controllers/createOrder";
import { ParamsType, deleteOrder } from "@/http/controllers/deleteOrder";
import { QueryType, readOrders } from "@/http/controllers/readOrders";
import { updateOrder } from "@/http/controllers/updateOrder";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function OrderRoutes(app: FastifyInstance) {
  app.post('/', {
    onRequest: verifyJWT,
    schema: {
      description: "Create a new inventory order",
      tags: ["Orders"],
      summary: "Create a new Order",
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
          type: { type: "string", description: 'in/out'},
          amount: { type: "number", description: '5' },
          productId: { type: "string", description: "uuid" },
        },
      },
      response: {
        201: {
          description: "Order created successfully.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                type: { type: "string" },
                productId: { type: "string" },
                amount: { type: "number"},
                created_at: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Resource not found/Product amount would negative with this order",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, createOrder)

  app.put('/', {
    onRequest: verifyJWT,
    schema: {
      description: "Update a inventory order info",
      tags: ["Orders"],
      summary: "Update an Order",
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
          type: { type: "string", description: 'in/out'},
          amount: { type: "number", description: '5' },
          productId: { type: "string", description: "uuid" },
        },
      },
      response: {
        200: {
          description: "Order updated successfully.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                type: { type: "string" },
                productId: { type: "string" },
                amount: { type: "number"},
                created_at: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Resource not found/Order cannot be updated: Product amount would be negative with this order",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, updateOrder)

  app.get<{Querystring: QueryType}>('/', {
    onRequest: verifyJWT,
    schema: {
      description: "List orders per page, 50 orders per page.",
      tags: ["Orders"],
      summary: "List Orders",
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
          description: "List order per page, 50 products per page.",
          type: "object",
          properties: {
            product: {
              type: "object",
              properties: {
                id: { type: "string"},
                type: { type: "string" },
                ptoductId: { type: "string" },
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
  }, readOrders)

  app.delete<{ Params: ParamsType}>('/:id', {
    onRequest: verifyJWT,
    schema: {
      description: "Delete an order using id.",
      tags: ["Orders"],
      summary: "Delete Order",
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
          description: "Order deleted successfully",
          type: 'object'
        },
        400: {
          description: "Resource not found/Order canoot be deleted: Final product amount would be negative.",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  }, deleteOrder)
}