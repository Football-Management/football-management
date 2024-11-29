import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "@/domain/finance/application/repositories/transaction-repository";
import { Either, right } from "@/core/either";
import * as tf from "@tensorflow/tfjs-node";

type PredictFinancialHealthResponse = Either<
  null,
  {
    predictions: {
      threeMonths: any;
      twelveMonths: any;
    };
  }
>;

@Injectable()
export class PredictFinancialHealthUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(clubId: string): Promise<PredictFinancialHealthResponse> {
    console.log(clubId);

    const mockData = this.generateMockData();

    const model = await this.trainModel(mockData);

    const predictions = await this.predictFuture(model, mockData);

    return right({
      predictions: {
        threeMonths: predictions.threeMonths,
        twelveMonths: predictions.twelveMonths,
      },
    });
  }

  private generateMockData() {
    const data: any = [];
    const startDate = new Date("2020-01-01");
    const months = 36;

    let baseIncome = 500000;
    let baseExpense = 300000;

    // Função para gerar números aleatórios com semente fixa
    const randomSeed = (seed: number) => {
      let value = seed;
      return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
      };
    };
    const rand = randomSeed(42); // Semente fixa

    for (let i = 0; i < months; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);

      const seasonalFactor = Math.sin((2 * Math.PI * i) / 12);

      const income = baseIncome + seasonalFactor * 200000 + rand() * 100000;

      const expense = baseExpense + seasonalFactor * 150000 + rand() * 50000;

      data.push({
        date: date.toISOString(),
        income: Math.round(income),
        expense: Math.round(expense),
      });

      baseIncome += 10000;
      baseExpense += 5000;
    }

    return data;
  }

  private async trainModel(data: any[]): Promise<tf.LayersModel> {
    const incomes = data.map((d) => d.income - d.expense);

    const minIncome = Math.min(...incomes);
    const maxIncome = Math.max(...incomes);
    const normalizedIncomes = incomes.map(
      (i) => (i - minIncome) / (maxIncome - minIncome),
    );

    const lookBack = 3;
    const xs: number[][][] = [];
    const ys: number[] = [];

    for (let i = lookBack; i < normalizedIncomes.length; i++) {
      xs.push(normalizedIncomes.slice(i - lookBack, i).map((val) => [val]));
      ys.push(normalizedIncomes[i]);
    }

    const inputTensor = tf.tensor3d(xs);
    const outputTensor = tf.tensor2d(ys.map((y) => [y]));

    const model = tf.sequential();
    model.add(
      tf.layers.lstm({
        units: 50,
        inputShape: [lookBack, 1],
        returnSequences: false,
      }),
    );
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    await model.fit(inputTensor, outputTensor, { epochs: 100, batchSize: 16 });

    return model;
  }

  private async predictFuture(model: tf.LayersModel, data: any[]) {
    const incomes = data.map((d) => d.income - d.expense);

    const minIncome = Math.min(...incomes);
    const maxIncome = Math.max(...incomes);
    const normalizedIncomes = incomes.map(
      (i) => (i - minIncome) / (maxIncome - minIncome),
    );

    const lastSequence = normalizedIncomes.slice(-3).map((val) => [val]);

    const futureSteps = [3, 12];
    const predictions: number[] = [];

    for (const step of futureSteps) {
      const prediction = model.predict(
        tf.tensor3d([lastSequence]),
      ) as tf.Tensor;
      const normalizedPrediction = prediction.dataSync()[0];
      const denormalizedPrediction =
        normalizedPrediction * (maxIncome - minIncome) + minIncome;

      predictions.push(denormalizedPrediction);

      lastSequence.push([normalizedPrediction]);
      lastSequence.shift();
    }

    console.log("Predictions:", predictions);

    return {
      threeMonths: predictions[0],
      twelveMonths: predictions[1],
    };
  }
}
