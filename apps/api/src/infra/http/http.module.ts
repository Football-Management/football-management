import { AuthenticateClubUseCase } from "@/domain/finance/application/use-cases/authenticate-club";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/register-club";
import { CreateTransactionController } from "./controllers/create-transaction.controller";
import { CreateTransactionUseCase } from "@/domain/finance/application/use-cases/create-transaction";
import { RegisterClubUseCase } from "@/domain/finance/application/use-cases/register-club";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { FinancialTransactionController } from "./controllers/fetch-balance.controller";
import { PredictFinancialHealthUseCase } from "@/domain/finance/application/use-cases/get-balance";
import { TensorFlowService } from "../tensorflow/tensorflow.service";
import { GetWeeklySummaryController } from "./controllers/get-weekly-summary.controller";
import { GetWeeklySummaryUseCase } from "@/domain/finance/application/use-cases/get-weekly-summary";
import { GetTransactionsSummaryController } from "./controllers/get-transactions-summary.controller";
import { GetTransactionsSummaryUseCase } from "@/domain/finance/application/use-cases/transactions-summary";
import { GetMonthlySummaryController } from "./controllers/get-monthly-summary.controller";
import { GetMonthlySummaryUseCase } from "@/domain/finance/application/use-cases/get-monthly-summary";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateTransactionController,
    AuthenticateController,
    CreateAccountController,
    FinancialTransactionController,
    GetWeeklySummaryController,
    GetMonthlySummaryController,
    GetTransactionsSummaryController,
  ],
  providers: [
    CreateTransactionUseCase,
    RegisterClubUseCase,
    AuthenticateClubUseCase,
    PredictFinancialHealthUseCase,
    GetWeeklySummaryUseCase,
    GetMonthlySummaryUseCase,
    GetTransactionsSummaryUseCase,
    TensorFlowService,
  ],
})
export class HttpModule {}
