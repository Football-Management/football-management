import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { FinancialPredictHealthUseCase } from "@/domain/finance/application/use-cases/get-financial-predict";

@Controller("financial-predict")
export class FinancialTransactionController {
  constructor(
    private readonly getBalanceUseCase: FinancialPredictHealthUseCase,
  ) {}

  @Get(":clubId")
  async getBalance(@Param("clubId") clubId: string) {
    const result = await this.getBalanceUseCase.execute(clubId);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
    const financialPredict = result.value.financialPredict;

    return { financialPredict };
  }
}
