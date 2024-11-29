import { Either, left, right } from "@/core/either";

import { Club } from "../../enterprise/entities/club";
import { ClubAlreadyExistsError } from "./errors/club-already-exists-error";
import { ClubRepository } from "../repositories/club-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { Injectable } from "@nestjs/common";

interface RegisterClubUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterClubUseCaseResponse = Either<
  ClubAlreadyExistsError,
  {
    club: Club;
  }
>;

@Injectable()
export class RegisterClubUseCase {
  constructor(
    private clubRepository: ClubRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterClubUseCaseRequest): Promise<RegisterClubUseCaseResponse> {
    const clubWithSameEmail = await this.clubRepository.findByEmail(email);

    if (clubWithSameEmail) {
      return left(new ClubAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const club = Club.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.clubRepository.create(club);

    return right({
      club,
    });
  }
}
