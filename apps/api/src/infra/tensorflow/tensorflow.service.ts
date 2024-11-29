import * as tf from "@tensorflow/tfjs-node";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TensorFlowService {
  async predictBalances(months: number[], amounts: number[]) {
    // Converte dados em tensores
    const inputs = tf.tensor2d(
      months.map((m) => [m]),
      [months.length, 1],
    );
    const labels = tf.tensor2d(
      amounts.map((a) => [a]),
      [amounts.length, 1],
    );

    // Criação do modelo
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 10, activation: "relu", inputShape: [1] }),
    );
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
      optimizer: "adam",
      loss: "meanSquaredError",
    });

    // Treinamento do modelo
    await model.fit(inputs, labels, {
      epochs: 100,
      verbose: 0,
    });

    // Previsão dos próximos meses
    const nextMonths = tf.tensor2d([
      [13],
      [14],
      [15],
      ...Array.from({ length: 12 }, (_, i) => [13 + i]),
    ]);

    const predictions = model.predict(nextMonths) as tf.Tensor;

    // Recupera valores como array
    const predictedBalances = (await predictions.array()) as number[][];

    // Processa previsões: mensal, trimestral e anual
    const monthlyBalance = predictedBalances[0][0];
    const quarterlyBalance = predictedBalances
      .slice(0, 3)
      .reduce((sum, val) => sum + val[0], 0);
    const yearlyBalance = predictedBalances
      .slice(0, 12)
      .reduce((sum, val) => sum + val[0], 0);

    return {
      monthlyBalance,
      quarterlyBalance,
      yearlyBalance,
    };
  }
}
