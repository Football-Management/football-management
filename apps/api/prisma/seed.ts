import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await prisma.transactionCategory.createMany({
  //     data: [
  //       { id: 1, name: "Receita", description: "Transações de receita" },
  //       { id: 2, name: "Despesa", description: "Transações de despesa" },
  //     ],
  //   });

  //   await prisma.sourceCategory.createMany({
  //     data: [
  //       {
  //         id: 1,
  //         name: "Patrocinador",
  //         description: "Patrocinadores fixos ou pontuais",
  //       },
  //       {
  //         id: 2,
  //         name: "Fornecedor",
  //         description: "Fornecedores de bens e serviços",
  //       },
  //       {
  //         id: 3,
  //         name: "Jogador",
  //         description: "Salários, transferências e vendas de jogadores",
  //       },
  //       { id: 4, name: "Técnico", description: "Pagamentos à comissão técnica" },
  //       {
  //         id: 5,
  //         name: "Torcedor",
  //         description: "Receita de ingressos, matchday e interações no estádio",
  //       },
  //       {
  //         id: 6,
  //         name: "Direito de transmissão",
  //         description: "Receita de transmissões de jogos",
  //       },
  //       {
  //         id: 7,
  //         name: "Merchandising",
  //         description: "Venda de produtos oficiais e licenciados",
  //       },
  //       {
  //         id: 8,
  //         name: "Sócio-torcedor",
  //         description: "Receita de programas de sócio-torcedor",
  //       },
  //       {
  //         id: 9,
  //         name: "Premiação",
  //         description: "Receita de conquistas esportivas",
  //       },
  //       {
  //         id: 10,
  //         name: "Parcerias",
  //         description: "Parcerias comerciais, marketing e publicidade",
  //       },
  //       { id: 11, name: "Outro", description: "Outras fontes" },
  //     ],
  //   });

  //   await prisma.recurrence.createMany({
  //     data: [
  //       { id: 1, name: "Semanal", description: "Recorrência semanal" },
  //       { id: 2, name: "Mensal", description: "Recorrência mensal" },
  //       { id: 3, name: "Anual", description: "Recorrência anual" },
  //       { id: 4, name: "Única", description: "Pagamento único" },
  //     ],
  //   });

  await prisma.financialTransaction.createMany({
    data: [
      {
        id: 1,
        transactionDate: "2024-01-15T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 170718.64,
        category: "Receita com Educação Esportiva",
        recurrenceId: 1,
        expectedAmount: 180000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 2,
        transactionDate: "2024-02-01T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 28613.2,
        category: "Venda de Produtos Esportivos",
        recurrenceId: 2,
        expectedAmount: 30000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 3,
        transactionDate: "2024-03-10T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 669000.0,
        category: "Patrocínio",
        recurrenceId: 2,
        expectedAmount: 700000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 4,
        transactionDate: "2024-04-01T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 128000.0,
        category: "Receitas com Doações e Subvenções",
        recurrenceId: 3,
        expectedAmount: 130000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 5,
        transactionDate: "2024-05-05T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 1472364.92,
        category: "Subvenções Governamentais",
        recurrenceId: 3,
        expectedAmount: 1500000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 6,
        transactionDate: "2024-06-15T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 477033.08,
        category: "Jogos e Bilheteiras",
        recurrenceId: 1,
        expectedAmount: 500000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 7,
        transactionDate: "2024-07-20T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 127000.0,
        category: "Direitos de Transmissão",
        recurrenceId: 2,
        expectedAmount: 130000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 8,
        transactionDate: "2024-08-10T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 4200.0,
        category: "Doações",
        recurrenceId: 4,
        expectedAmount: 5000,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 9,
        transactionDate: "2024-09-01T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 645994,
        category: "Subvenções de Entidades Confederativas",
        recurrenceId: 3,
        expectedAmount: 650000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 10,
        transactionDate: "2024-10-05T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 3313.33,
        category: "Receita de Aluguel",
        recurrenceId: 2,
        expectedAmount: 3500.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 11,
        transactionDate: "2024-11-15T00:00:00.000Z",
        transactionCategoryId: 1,
        amount: 2274.99,
        category: "Outras Receitas Operacionais",
        recurrenceId: 1,
        expectedAmount: 2500.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 12,
        transactionDate: "2024-12-01T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 645013.34,
        category: "Despesas Operacionais",
        recurrenceId: 1,
        expectedAmount: 660000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 13,
        transactionDate: "2024-01-20T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 10244.9,
        category: "Água",
        recurrenceId: 2,
        expectedAmount: 11000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 14,
        transactionDate: "2024-02-10T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 427.99,
        category: "Impressos e Materiais de Papelaria",
        recurrenceId: 3,
        expectedAmount: 500.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 15,
        transactionDate: "2024-03-01T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 29795.33,
        category: "Aluguel",
        recurrenceId: 3,
        expectedAmount: 31000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 16,
        transactionDate: "2024-04-20T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 225.0,
        category: "TV / Internet",
        recurrenceId: 2,
        expectedAmount: 300.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 17,
        transactionDate: "2024-05-01T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 30656.64,
        category: "Materiais para Manutenção de Instalações",
        recurrenceId: 1,
        expectedAmount: 32000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 18,
        transactionDate: "2024-06-10T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 31178.5,
        category: "Despesas com Jogadores",
        recurrenceId: 1,
        expectedAmount: 33000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 19,
        transactionDate: "2024-08-01T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 18745.1,
        category: "Despesas com Marketing",
        recurrenceId: 2,
        expectedAmount: 20000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
      {
        id: 20,
        transactionDate: "2024-09-10T00:00:00.000Z",
        transactionCategoryId: 2,
        amount: 41745.0,
        category: "Despesas com Jogadores",
        recurrenceId: 2,
        expectedAmount: 45000.0,
        projected: false,
        clubId: "077c7886-2afa-4719-b675-6cacd486e207",
      },
    ],
  });

  console.log("Dados de seed inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
