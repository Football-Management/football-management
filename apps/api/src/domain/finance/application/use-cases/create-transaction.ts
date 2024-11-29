import { Either, left, right } from "@/core/either";

import { Injectable } from "@nestjs/common";
import { Transaction } from "@/domain/finance/enterprise/entities/transaction";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";

interface TransactionCaseRequest {
  transactionDate: string;
  transactionCategoryId: number;
  amount: number;
  category?: string;
  clubId: string;
  sourceId?: number;
  recurrenceId?: number;
  seasonalityId?: number;
  expectedAmount?: number;
  projected?: boolean;
}

type TransactionUseCaseResponse = Either<
  null,
  {
    transaction: Transaction;
  }
>;

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    data: TransactionCaseRequest,
  ): Promise<TransactionUseCaseResponse> {
    const {
      transactionDate,
      transactionCategoryId,
      amount,
      category,
      clubId,
      sourceId,
      recurrenceId,
      seasonalityId,
      expectedAmount,
      projected = false,
    } = data;

    if (!transactionDate || !transactionCategoryId || !amount || !clubId) {
      left(new Error("Missing required fields for transaction creation."));
    }

    const transaction = Transaction.create({
      transactionDate,
      transactionCategoryId,
      amount,
      category,
      clubId,
      sourceId,
      recurrenceId,
      seasonalityId,
      expectedAmount,
      projected,
    });

    await this.transactionRepository.create(transaction);

    return right({
      transaction,
    });
  }
}
