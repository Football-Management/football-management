import { CreateTransactionUseCase } from "@/domain/finance/application/use-cases/create-transaction";
import { InMemoryTransactionAttachmentsRepository } from "test/repositories/in-memory-transaction-repository";

let inMemoryAnswersRepository: InMemoryTransactionAttachmentsRepository;
let sut: CreateTransactionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryTransactionAttachmentsRepository();
    sut = new CreateTransactionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a transaction", async () => {
    const result = await sut.execute({
      data: [],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(
      result.value?.transaction,
    );
  });
});
