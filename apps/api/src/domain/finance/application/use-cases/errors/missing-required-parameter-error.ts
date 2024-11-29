import { UseCaseError } from "@/core/errors/use-case-error";

export class MissingRequiredParameterError
  extends Error
  implements UseCaseError
{
  constructor(parameterName: string) {
    super(`The required parameter "${parameterName}" is missing.`);
  }
}
