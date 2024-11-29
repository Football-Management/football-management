import { Either, left, right } from "@/core/either";

import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { MissingRequiredParameterError } from "./errors/missing-required-parameter-error";

type MonthlySummaryUseCaseResponse = Either<
  MissingRequiredParameterError,
  {
    monthlySummary: {
      totalIncome: number;
      totalExpense: number;
      balance: number;
      percentageChange: number;
      topCategories: { category: string; amount: number }[];
    };
  }
>;

@Injectable()
export class GetMonthlySummaryUseCase {
  constructor(private monthlySummaryRepository: TransactionRepository) {}

  async execute(clubId: string): Promise<MonthlySummaryUseCaseResponse> {
    if (!clubId) {
      return left(new MissingRequiredParameterError("id"));
    }

    const monthlySummary =
      await this.monthlySummaryRepository.getMonthlyBalanceAndCategories(
        clubId,
      );

    return right({
      monthlySummary,
    });
  }
}
