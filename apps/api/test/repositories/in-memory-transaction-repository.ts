import { Transaction } from "@/domain/finance/enterprise/entities/transaction";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";

export class InMemoryTransactionAttachmentsRepository
  implements TransactionRepository
{
  public items: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.items.push(...transaction);
  }
}
