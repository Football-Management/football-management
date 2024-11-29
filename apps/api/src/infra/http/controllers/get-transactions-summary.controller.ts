import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { GetTransactionsSummaryUseCase } from "src/domain/finance/application/use-cases/transactions-summary";

@Controller("transactions-summary")
export class GetTransactionsSummaryController {
  constructor(
    private readonly getTransactionsSummaryUseCase: GetTransactionsSummaryUseCase,
  ) {}

  @Get(":clubId")
  async getTransactionsSummary(@Param("clubId") clubId: string) {
    const result = await this.getTransactionsSummaryUseCase.execute(clubId);

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const transactionsSummary = result.value.transactionsSummary;

    return { transactionsSummary };
  }
}
