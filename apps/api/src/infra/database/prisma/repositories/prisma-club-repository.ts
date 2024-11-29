import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ClubRepository } from "@/domain/finance/application/repositories/club-repository";
import { Club } from "@/domain/finance/enterprise/entities/club";
import { PrismaClubMapper } from "../mappers/prisma-club-mapper";

@Injectable()
export class PrismaClubRepository implements ClubRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Club | null> {
    const club = await this.prisma.club.findUnique({
      where: {
        email,
      },
    });

    if (!club) {
      return null;
    }

    return PrismaClubMapper.toDomain(club);
  }

  async create(club: Club): Promise<void> {
    const data = PrismaClubMapper.toPrisma(club);

    await this.prisma.club.create({
      data,
    });
  }
}
