import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { GetWeeklySummaryUseCase } from "src/domain/finance/application/use-cases/get-weekly-summary";

@Controller("weekly-summary")
export class GetWeeklySummaryController {
  constructor(
    private readonly getWeeklySummaryUseCase: GetWeeklySummaryUseCase,
  ) {}

  @Get(":clubId")
  async getWeeklySummary(@Param("clubId") clubId: string) {
    const result = await this.getWeeklySummaryUseCase.execute(clubId);

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const weeklySummary = result.value.weeklySummary;

    return { weeklySummary };
  }
}
