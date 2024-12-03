import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { FinancialTransaction } from "@prisma/client";

@Injectable()
export class PrismaTransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    transaction: Omit<FinancialTransaction, "id">,
  ): Promise<FinancialTransaction> {
    return this.prisma.financialTransaction.create({
      data: {
        transactionDate: transaction.transactionDate,
        transactionCategoryId: transaction.transactionCategoryId,
        amount: transaction.amount,
        category: transaction.category,
        clubId: transaction.clubId,
        expectedAmount: transaction.expectedAmount,
        projected: transaction.projected,
        createdAt: transaction.createdAt,
      },
    });
  }
  async findById(id: number): Promise<FinancialTransaction | null> {
    return this.prisma.financialTransaction.findUnique({
      where: { id },
      include: { transactionCategory: true },
    });
  }

  async findAllByClubId(clubId: string): Promise<FinancialTransaction[]> {
    return this.prisma.financialTransaction.findMany({
      where: { clubId },
      include: { transactionCategory: true },
    });
  }

  async getBalanceByClubId(
    clubId: string,
  ): Promise<{ income: number; expense: number; balance: number }> {
    const transactions = await this.prisma.financialTransaction.findMany({
      where: { clubId },
      include: { transactionCategory: true },
    });

    const income = transactions
      .filter((t) => t.transactionCategory.id === 1)
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.transactionCategory.id === 2)
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    return { income, expense, balance };
  }

  async getWeeklyBalanceAndCategories(clubId: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    percentageChange: number;
    topCategories: { category: string; amount: number }[];
  }> {
    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - 7);

    const transactions = await this.prisma.financialTransaction.findMany({
      where: {
        clubId,
        transactionDate: {
          gte: startOfWeek,
          lte: today,
        },
      },
      include: { transactionCategory: true },
    });

    const previousWeekStart = new Date(startOfWeek);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    const previousWeekEnd = new Date(startOfWeek);

    const previousTransactions =
      await this.prisma.financialTransaction.findMany({
        where: {
          clubId,
          transactionDate: {
            gte: previousWeekStart,
            lte: previousWeekEnd,
          },
        },
        include: { transactionCategory: true },
      });

    const totalIncome = transactions
      .filter((t) => t.transactionCategory.id === 1)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.transactionCategory.id === 2)
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const previousIncome = previousTransactions
      .filter((t) => t.transactionCategory.id === 1)
      .reduce((sum, t) => sum + t.amount, 0);

    const previousExpense = previousTransactions
      .filter((t) => t.transactionCategory.id === 2)
      .reduce((sum, t) => sum + t.amount, 0);

    const previousBalance = previousIncome - previousExpense;

    const percentageChange =
      previousBalance !== 0
        ? ((balance - previousBalance) / Math.abs(previousBalance)) * 100
        : balance > 0
          ? 100
          : 0;

    const formattedPercentageChange = Math.min(
      Math.max(Number(percentageChange.toFixed(2)), -100),
      100,
    );

    const categories = transactions.reduce(
      (acc, t) => {
        const category = t.category || "unknown";
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const topCategories = Object.entries(categories)
      .sort(([, amountA], [, amountB]) => amountB - amountA)
      .slice(0, 5)
      .map(([category, amount]) => ({ category, amount }));

    return {
      totalIncome,
      totalExpense,
      balance,
      percentageChange: formattedPercentageChange,
      topCategories,
    };
  }

  async getMonthlyBalanceAndCategories(clubId: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    percentageChange: number;
    topCategories: { category: string; amount: number }[];
  }> {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const transactions = await this.prisma.financialTransaction.findMany({
      where: {
        clubId,
        transactionDate: {
          gte: startOfMonth,
          lte: today,
        },
      },
      include: { transactionCategory: true },
    });

    const previousMonthEnd = new Date(startOfMonth);
    const previousMonthStart = new Date(
      previousMonthEnd.getFullYear(),
      previousMonthEnd.getMonth() - 1,
      1,
    );

    const previousTransactions =
      await this.prisma.financialTransaction.findMany({
        where: {
          clubId,
          transactionDate: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },
        include: { transactionCategory: true },
      });

    const totalIncome = transactions
      .filter((t) => t.transactionCategory.id === 1)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.transactionCategory.id === 2)
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const previousIncome = previousTransactions
      .filter((t) => t.transactionCategory.id === 1)
      .reduce((sum, t) => sum + t.amount, 0);

    const previousExpense = previousTransactions
      .filter((t) => t.transactionCategory.id === 2)
      .reduce((sum, t) => sum + t.amount, 0);

    const previousBalance = previousIncome - previousExpense;

    const percentageChange =
      previousBalance !== 0
        ? ((balance - previousBalance) / Math.abs(previousBalance)) * 100
        : balance > 0
          ? 100
          : 0;

    const formattedPercentageChange = Math.min(
      Math.max(Number(percentageChange.toFixed(2)), -100),
      100,
    );

    const categories = transactions.reduce(
      (acc, t) => {
        const category = t.category || "unknown";
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const topCategories = Object.entries(categories)
      .sort(([, amountA], [, amountB]) => amountB - amountA)
      .slice(0, 5)
      .map(([category, amount]) => ({ category, amount }));

    return {
      totalIncome,
      totalExpense,
      balance,
      percentageChange: formattedPercentageChange,
      topCategories,
    };
  }
}
