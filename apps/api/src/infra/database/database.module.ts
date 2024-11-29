import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaTransactionRepository } from "./prisma/repositories/prisma-transaction-repository";
import { PrismaClubRepository } from "./prisma/repositories/prisma-club-repository";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { ClubRepository } from "@/domain/finance/application/repositories/club-repository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: ClubRepository,
      useClass: PrismaClubRepository,
    },
  ],
  exports: [PrismaService, TransactionRepository, ClubRepository],
})
export class DatabaseModule {}
