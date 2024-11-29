import { DomainEvents } from "@/core/events/domain-events";
import { ClubRepository } from "@/domain/finance/application/repositories/club-repository";
import { Club } from "@/domain/finance/enterprise/entities/club";

export class InMemoryStudentsRepository implements ClubRepository {
  public items: Club[] = [];

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email);

    if (!student) {
      return null;
    }

    return student;
  }

  async create(student: Club) {
    this.items.push(student);

    DomainEvents.dispatchEventsForAggregate(student.id);
  }
}
