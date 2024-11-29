import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface TransactionProps {
  transactionDate: string;
  transactionCategoryId: number;
  amount: number;
  category?: string;
  clubId: string;
  sourceId?: number;
  recurrenceId?: number;
  seasonalityId?: number;
  expectedAmount?: number;
  projected?: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Transaction extends AggregateRoot<TransactionProps> {
  get transactionDate() {
    return this.props.transactionDate;
  }

  get transactionCategoryId() {
    return this.props.transactionCategoryId;
  }

  get amount() {
    return this.props.amount;
  }

  get category() {
    return this.props.category;
  }

  get clubId() {
    return this.props.clubId;
  }

  get sourceId() {
    return this.props.sourceId;
  }

  get recurrenceId() {
    return this.props.recurrenceId;
  }

  get seasonalityId() {
    return this.props.seasonalityId;
  }

  get expectedAmount() {
    return this.props.expectedAmount;
  }

  get projected() {
    return this.props.projected ?? false;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<TransactionProps, "createdAt" | "projected">,
    id?: UniqueEntityID,
  ) {
    const transaction = new Transaction(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        projected: props.projected ?? false,
      },
      id,
    );

    return transaction;
  }
}
