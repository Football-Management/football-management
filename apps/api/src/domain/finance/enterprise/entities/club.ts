import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface ClubProps {
  name: string;
  email: string;
  password: string;
}

export class Club extends Entity<ClubProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: ClubProps, id?: UniqueEntityID) {
    const club = new Club(props, id);

    return club;
  }
}
