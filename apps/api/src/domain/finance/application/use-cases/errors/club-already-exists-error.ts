import { UseCaseError } from "@/core/errors/use-case-error";

export class ClubAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Club "${identifier}" already exists.`);
  }
}
