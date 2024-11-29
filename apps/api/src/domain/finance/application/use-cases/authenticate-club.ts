import { Either, left, right } from "@/core/either";

import { ClubRepository } from "../repositories/club-repository";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { Injectable } from "@nestjs/common";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateClubUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateClubUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateClubUseCase {
  constructor(
    private clubRepository: ClubRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateClubUseCaseRequest): Promise<AuthenticateClubUseCaseResponse> {
    const club = await this.clubRepository.findByEmail(email);

    if (!club) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      club.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: club.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
