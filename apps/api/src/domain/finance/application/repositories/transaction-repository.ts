import { Transaction } from "../../enterprise/entities/transaction";

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract findById(id: number): Promise<Transaction | null>;
  abstract findAllByClubId(clubId: string): Promise<Transaction[]>;
  abstract getBalanceByClubId(clubId: string): Promise<{
    income: number;
    expense: number;
  }>;
  abstract getWeeklyBalanceAndCategories(clubId: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    percentageChange: number;
    topCategories: { category: string; amount: number }[];
  }>;
  abstract getMonthlyBalanceAndCategories(clubId: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    percentageChange: number;
    topCategories: { category: string; amount: number }[];
  }>;
}
