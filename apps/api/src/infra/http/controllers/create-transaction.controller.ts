import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateTransactionUseCase } from "@/domain/finance/application/use-cases/create-transaction";

const TransactionBodySchema = z.object({
  transactionDate: z.string(),
  transactionCategoryId: z.number(),
  amount: z.number().positive(),
  category: z.string().optional(),
  sourceId: z.number().optional(),
  recurrenceId: z.number().optional(),
  seasonalityId: z.number().optional(),
  expectedAmount: z.number().positive().optional(),
});

const bodyValidationPipe = new ZodValidationPipe(TransactionBodySchema);

type TransactionBodySchema = z.infer<typeof TransactionBodySchema>;

@Controller("/create-transaction")
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: TransactionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      transactionDate,
      transactionCategoryId,
      amount,
      category,
      sourceId,
      recurrenceId,
      seasonalityId,
      expectedAmount,
    } = body;

    const result = await this.createTransactionUseCase.execute({
      transactionDate,
      transactionCategoryId,
      amount,
      category,
      sourceId,
      recurrenceId,
      seasonalityId,
      expectedAmount,
      clubId: user.sub,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
