import { Prisma, Club as PrismaClub } from "@prisma/client";

import { Club } from "@/domain/finance/enterprise/entities/club";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class PrismaClubMapper {
  static toDomain(raw: PrismaClub): Club {
    return Club.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(club: Club): Prisma.ClubUncheckedCreateInput {
    return {
      id: club.id.toString(),
      name: club.name,
      email: club.email,
      password: club.password,
    };
  }
}
