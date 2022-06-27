import { AggregateRoot } from '@nestjs/cqrs';
import { PadresId } from '../value-objects/mother-id.value';
import { Email } from '../value-objects/email.value';
import { PadresRegisteredEvent } from '../events/mother-registered.event';
import { Password } from '../../../common/domain/value-objects/password.value';

export class Padres extends AggregateRoot {
  private id: PadresId;
  private name: string;
  private lastName: string;
  private email: Email;
  private password: Password;

  public constructor(
    id:PadresId,
    name: string,
    lastName: string,
    email: Email,
    password: Password,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  public register() {
    const event = new PadresRegisteredEvent(
      this.id.getValue(),
      this.name,
      this.lastName,
      this.email.getValue(),
      this.password.getValue(),
    );
    this.apply(event);
  }

  public getId(): PadresId {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public changeId(id: PadresId): void {
    this.id = id;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changeLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public changeEmail(email: Email): void {
    this.email = email;
  }

  public changePassword(password: Password) {
    this.password = password;
  }
}
