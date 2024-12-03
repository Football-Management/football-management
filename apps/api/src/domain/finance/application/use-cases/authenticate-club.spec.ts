import { InMemoryStudentsRepository } from "test/repositories/in-memory-club-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateClubUseCase } from "./authenticate-club";
import { makeStudent } from "test/factories/make-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateClubUseCase;

describe("Authenticate Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateClubUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      encrypter,
    );
  });

  it("should be able to authenticate a student", async () => {
    const student = makeStudent({
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});