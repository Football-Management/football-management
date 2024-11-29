import { Either, left, right } from "@/core/either";

import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { MissingRequiredParameterError } from "./errors/missing-required-parameter-error";

type TransactionsSummaryUseCaseResponse = Either<
  MissingRequiredParameterError,
  {
    transactionsSummary: any;
  }
>;

@Injectable()
export class GetTransactionsSummaryUseCase {
  constructor(private transactionsSummaryRepository: TransactionRepository) {}

  async execute(clubId: string): Promise<TransactionsSummaryUseCaseResponse> {
    if (!clubId) {
      return left(new MissingRequiredParameterError("id"));
    }

    const transactionsSummary =
      await this.transactionsSummaryRepository.getBalanceByClubId(clubId);

    return right({
      transactionsSummary,
    });
  }
}
