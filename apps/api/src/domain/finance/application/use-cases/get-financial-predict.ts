import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { Either, right } from "@/core/either";
import * as tf from "@tensorflow/tfjs";

type FinancialPredictHealthResponse = Either<
  null,
  {
    financialPredict: any;
  }
>;

@Injectable()
export class FinancialPredictHealthUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(clubId: string): Promise<FinancialPredictHealthResponse> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // O mês atual (1-12)

    // Dados de entrada (meses) e saída (receitas)
    const transactions: any[] =
      await this.transactionRepository.findAllByClubId(clubId);

    const groupedByMonth = transactions.reduce((acc: any, transaction) => {
      const month = new Date(transaction.transactionDate).getMonth() + 1;
      const year = new Date(transaction.transactionDate).getFullYear();

      // Verifica se a categoria é de "Receita"
      if (transaction.transactionCategoryId === 1) {
        if (!acc[year]) {
          acc[year] = {};
        }

        if (!acc[year][month]) {
          acc[year][month] = 0;
        }

        acc[year][month] += transaction.amount;
      }
      return acc;
    }, {});

    // Função para agrupar e somar as receitas por mês
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const receitas = months.map((month) => {
      const totalReceitas = Object.values(groupedByMonth)
        .map((yearData: any) => yearData[month] || 0)
        .reduce((acc, amount) => acc + amount, 0);
      return totalReceitas;
    });

    // Normalizando os dados de entrada e saída
    const inputData = tf.tensor(months).expandDims(1); // Converte para tensor 2D
    const outputData = tf.tensor(receitas);

    // Criando um modelo sequencial simples
    const model: any = tf.sequential();

    // Adicionando uma camada densa (camada totalmente conectada)
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compilando o modelo com otimizador e função de perda
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    // Treinando o modelo
    await model.fit(inputData, outputData, { epochs: 200 });

    // Previsão para o próximo mês (mês atual + 1)
    const predictedMonthValue = model
      .predict(tf.tensor([currentMonth + 1 > 12 ? 1 : currentMonth + 1]))
      .dataSync()[0];

    // Previsão para o próximo trimestre (meses atuais + 1, 2, 3)
    const predictedQuarterValue =
      model
        .predict(tf.tensor([currentMonth + 1 > 12 ? 1 : currentMonth + 1]))
        .dataSync()[0] +
      model
        .predict(
          tf.tensor([
            currentMonth + 2 > 12 ? currentMonth + 2 - 12 : currentMonth + 2,
          ]),
        )
        .dataSync()[0] +
      model
        .predict(
          tf.tensor([
            currentMonth + 3 > 12 ? currentMonth + 3 - 12 : currentMonth + 3,
          ]),
        )
        .dataSync()[0];

    // Previsão para o próximo ano (meses atuais + 1 até o mês 12 do próximo ano)
    let predictedYearValue = 0;
    for (let i = currentMonth + 1; i <= currentMonth + 12; i++) {
      const monthForPrediction = i > 12 ? i - 12 : i; // Ajusta para não ultrapassar 12
      predictedYearValue += model
        .predict(tf.tensor([monthForPrediction]))
        .dataSync()[0];
    }

    // Definindo o valor de referência para comparação
    const lastMonthRevenue = receitas[receitas.length - 1]; // Receita do último mês (último mês no array)

    // Classificando o momento financeiro com base na previsão
    let classification: string;

    // Definindo os limites para cada momento financeiro
    if (predictedMonthValue > lastMonthRevenue * 1.1) {
      classification = "Muito Positivo"; // > 10% superior
    } else if (predictedMonthValue > lastMonthRevenue * 1.05) {
      classification = "Positivo"; // Entre 0% e 10% superior
    } else if (predictedMonthValue >= lastMonthRevenue * 0.95) {
      classification = "Neutro"; // Entre -5% e +5% (sem grande variação)
    } else if (predictedMonthValue >= lastMonthRevenue * 0.9) {
      classification = "Negativo"; // Entre 0% e -10% inferior
    } else {
      classification = "Muito Negativo"; // < -10% inferior

      console.log(
        predictedMonthValue.toFixed(2),
        predictedQuarterValue.toFixed(2),
        predictedYearValue.toFixed(2),
        classification,
      );
    }

    return right({
      financialPredict: {
        nextMonthPrediction: Number(predictedMonthValue.toFixed(2)),
        nextQuarterPrediction: Number(predictedQuarterValue.toFixed(2)),
        nextYearPrediction: Number(predictedYearValue.toFixed(2)),
        financialClassification: classification,
      },
    });
  }
}
