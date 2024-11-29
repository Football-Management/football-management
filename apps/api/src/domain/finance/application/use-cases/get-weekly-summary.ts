import { Either, left, right } from "@/core/either";

import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { MissingRequiredParameterError } from "./errors/missing-required-parameter-error";

type WeeklySummaryUseCaseResponse = Either<
  MissingRequiredParameterError,
  {
    weeklySummary: {
      totalIncome: number;
      totalExpense: number;
      balance: number;
      percentageChange: number;
      topCategories: { category: string; amount: number }[];
    };
  }
>;

@Injectable()
export class GetWeeklySummaryUseCase {
  constructor(private weeklySummaryRepository: TransactionRepository) {}

  async execute(clubId: string): Promise<WeeklySummaryUseCaseResponse> {
    if (!clubId) {
      return left(new MissingRequiredParameterError("id"));
    }

    const weeklySummary =
      await this.weeklySummaryRepository.getWeeklyBalanceAndCategories(clubId);

    return right({
      weeklySummary,
    });
  }
}
