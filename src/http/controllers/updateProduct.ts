import { ProductCannotBeCreated } from "@/use-cases/errors/product-cannot-be-created-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { ProductCannotHaveSameName } from "@/use-cases/errors/same-product-name-error";
import { makeUpdateProductInfoUseCase } from "@/use-cases/factories/makeUpdateProductInfoUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productInfoBodySchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    category: z.string().min(1),
    amount: z.number().min(1),
  });

  const { id, name, category, amount } = productInfoBodySchema.parse(
    request.body
  );

  const product = {
    id,
    name,
    category,
    amount,
  };

  try {
    const updateProductInfoUseCase = makeUpdateProductInfoUseCase();
    const newProduct = await updateProductInfoUseCase.execute(product);

    return reply.status(204).send(newProduct);
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof ProductCannotBeCreated ||
      err instanceof ProductCannotHaveSameName
    ) {
      return reply.status(400).send({ message: err.message });
    } else {
      return reply.status(500);
    }
  }
}
