import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { GetMonthlySummaryUseCase } from "src/domain/finance/application/use-cases/get-monthly-summary";

@Controller("monthly-summary")
export class GetMonthlySummaryController {
  constructor(
    private readonly getMonthlySummaryUseCase: GetMonthlySummaryUseCase,
  ) {}

  @Get(":clubId")
  async getMonthlySummary(@Param("clubId") clubId: string) {
    const result = await this.getMonthlySummaryUseCase.execute(clubId);

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const monthlySummary = result.value.monthlySummary;

    return { monthlySummary };
  }
}
