const tf = require("@tensorflow/tfjs");

// Dados de entrada (meses) e saída (receitas)
const meses = [1, 2, 3, 4, 5]; // Meses (1 a 5)
const receitas = [1000000, 1200000, 1100000, 1300000, 1250000]; // Receita correspondente

// Normalizando os dados de entrada e saída
const inputData = tf.tensor(meses).expandDims(1); // Converte para tensor 2D
const outputData = tf.tensor(receitas);

// Criando um modelo sequencial simples
const model = tf.sequential();

// Adicionando uma camada densa (camada totalmente conectada)
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Compilando o modelo com otimizador e função de perda
model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

// Treinando o modelo
model.fit(inputData, outputData, { epochs: 200 }).then(() => {
  // Fazendo a previsão para o próximo mês (mês 6)
  const predictedMonthValue = model.predict(tf.tensor([6])).dataSync()[0];

  // Previsão para o próximo trimestre (mês 6, 7, 8)
  const predictedQuarterValue =
    model.predict(tf.tensor([6])).dataSync()[0] +
    model.predict(tf.tensor([7])).dataSync()[0] +
    model.predict(tf.tensor([8])).dataSync()[0];

  // Previsão para o próximo ano (meses 6 a 17)
  let predictedYearValue = 0;
  for (let i = 6; i <= 17; i++) {
    predictedYearValue += model.predict(tf.tensor([i])).dataSync()[0];
  }

  // Definindo o valor de referência para comparação
  const lastMonthRevenue = receitas[receitas.length - 1]; // Receita do último mês (mês 5)

  // Classificando o momento financeiro com base na previsão
  let classification;

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
  }

  // Exibindo a previsão e a classificação detalhada
  console.log(
    `Previsão de receita para o próximo mês (mês 6): R$ ${predictedMonthValue.toFixed(2)}`,
  );
  console.log(
    `Classificação do momento financeiro para o próximo mês: ${classification}`,
  );

  // Exibindo a previsão para o próximo trimestre
  console.log(
    `Previsão de receita para o próximo trimestre (meses 6-8): R$ ${predictedQuarterValue.toFixed(2)}`,
  );

  // Exibindo a previsão para o próximo ano
  console.log(
    `Previsão de receita para o próximo ano (meses 6-17): R$ ${predictedYearValue.toFixed(2)}`,
  );
});
