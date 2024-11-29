import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Club, ClubProps } from "@/domain/finance/enterprise/entities/club";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { PrismaClubMapper } from "@/infra/database/prisma/mappers/prisma-club-mapper";

export function makeStudent(
  override: Partial<ClubProps> = {},
  id?: UniqueEntityID,
) {
  const student = Club.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return student;
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<ClubProps> = {}): Promise<Club> {
    const student = makeStudent(data);

    await this.prisma.user.create({
      data: PrismaClubMapper.toPrisma(student),
    });

    return student;
  }
}
