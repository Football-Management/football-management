import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { PredictFinancialHealthUseCase } from "src/domain/finance/application/use-cases/get-balance";

@Controller("balance")
export class FinancialTransactionController {
  constructor(
    private readonly getBalanceUseCase: PredictFinancialHealthUseCase,
  ) {}

  @Get(":clubId")
  async getBalance(@Param("clubId") clubId: string) {
    const result = await this.getBalanceUseCase.execute(clubId);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
    const predictFinancial = result.value.predictions;

    return { predictFinancial };
  }
}
