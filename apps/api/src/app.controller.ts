import { Controller, Get } from '@nestjs/common'
import * as tf from '@tensorflow/tfjs'

@Controller('financas')
export class AppController {
  private model: tf.Sequential

  constructor() {
    this.initModel()
  }

  private initModel() {
    this.model = tf.sequential()
    this.model.add(
      tf.layers.lstm({
        units: 50,
        inputShape: [1, 2],
        returnSequences: true,
      }),
    )
    this.model.add(
      tf.layers.lstm({
        units: 30,
        returnSequences: false,
      }),
    )
    this.model.add(
      tf.layers.dense({
        units: 1,
      }),
    )

    this.model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    })

    // Inicializar o modelo com dados de treinamento fictício
    this.trainModel()
  }

  private async trainModel() {
    // Mockup de dados financeiros
    const financeData = [
      { entradas: 100000, saidas: 50000 },
      { entradas: 120000, saidas: 60000 },
      { entradas: 130000, saidas: 70000 },
      { entradas: 140000, saidas: 50000 },
      { entradas: 150000, saidas: 80000 },
    ]

    const inputs: any = financeData.map((data) => [data.entradas, data.saidas])
    const outputs = financeData.map((data) => data.entradas - data.saidas)

    const inputTensor = tf.tensor3d(inputs, [inputs.length, 1, 2])
    const outputTensor = tf.tensor2d(outputs, [outputs.length, 1])

    await this.model.fit(inputTensor, outputTensor, {
      epochs: 100,
      batchSize: 5,
    })
  }

  @Get('/prevision')
  async predictNextMonths() {
    // Dados financeiros diretamente no método
    const financeData: any = [
      { entradas: 100000, saidas: 50000 },
      { entradas: 120000, saidas: 60000 },
      { entradas: 130000, saidas: 70000 },
      { entradas: 140000, saidas: 50000 },
      { entradas: 150000, saidas: 80000 },
      // Adicione mais dados conforme necessário
    ]

    // Usar o último item do mockup para fazer uma previsão
    const lastData = financeData[financeData.length - 1]
    const inputTensor = tf.tensor3d(
      [[lastData.entradas, lastData.saidas]],
      [1, 1, 2],
    )
    const prediction = this.model.predict(inputTensor) as tf.Tensor
    const predictionValue = (await prediction.data())[0]

    return `Previsão de saldo para o próximo mês: R$ ${predictionValue.toFixed(
      2,
    )}`
  }
}
