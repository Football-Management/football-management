import { Club } from "../../enterprise/entities/club";

export abstract class ClubRepository {
  abstract findByEmail(email: string): Promise<Club | null>;
  abstract create(club: Club): Promise<void>;
}
