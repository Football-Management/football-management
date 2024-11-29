import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transactionCategory.createMany({
    data: [
      { id: 1, name: "Receita", description: "Transações de receita" },
      { id: 2, name: "Despesa", description: "Transações de despesa" },
    ],
  });

  await prisma.sourceCategory.createMany({
    data: [
      {
        id: 1,
        name: "Patrocinador",
        description: "Patrocinadores fixos ou pontuais",
      },
      {
        id: 2,
        name: "Fornecedor",
        description: "Fornecedores de bens e serviços",
      },
      {
        id: 3,
        name: "Jogador",
        description: "Salários, transferências e vendas de jogadores",
      },
      { id: 4, name: "Técnico", description: "Pagamentos à comissão técnica" },
      {
        id: 5,
        name: "Torcedor",
        description: "Receita de ingressos, matchday e interações no estádio",
      },
      {
        id: 6,
        name: "Direito de transmissão",
        description: "Receita de transmissões de jogos",
      },
      {
        id: 7,
        name: "Merchandising",
        description: "Venda de produtos oficiais e licenciados",
      },
      {
        id: 8,
        name: "Sócio-torcedor",
        description: "Receita de programas de sócio-torcedor",
      },
      {
        id: 9,
        name: "Premiação",
        description: "Receita de conquistas esportivas",
      },
      {
        id: 10,
        name: "Parcerias",
        description: "Parcerias comerciais, marketing e publicidade",
      },
      { id: 11, name: "Outro", description: "Outras fontes" },
    ],
  });

  await prisma.recurrence.createMany({
    data: [
      { id: 1, name: "Semanal", description: "Recorrência semanal" },
      { id: 2, name: "Mensal", description: "Recorrência mensal" },
      { id: 3, name: "Anual", description: "Recorrência anual" },
      { id: 4, name: "Única", description: "Pagamento único" },
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
