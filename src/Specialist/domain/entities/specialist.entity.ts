import { AggregateRoot } from '@nestjs/cqrs';
import { Email } from '../../../mothers/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';
import { CNum } from '../../../mothers/domain/value-objects/CNum.value';
import { SpecialistId } from '../value-objects/specialist-id.value';
import { SpecialistRegisteredEvent } from '../events/specialist-registered.event';

export class Specialist extends AggregateRoot {
  private id: SpecialistId;
  private firstName: string;
  private lastName: string;
  private email: Email;
  private password: Password;
  private CNum: CNum;

  public constructor(
    id: SpecialistId,
    firstName: string,
    lastName: string,
    email: Email,
    password: Password,
    CNum: CNum,
  ) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.CNum = CNum;
  }

  public register() {
    const event = new SpecialistRegisteredEvent(
      this.id.getValue(),
      this.firstName,
      this.lastName,
      this.email.getValue(),
      this.password.getValue(),
      this.CNum.getCNum(),
    );
    this.apply(event);
  }

  public getId(): SpecialistId {
    return this.id;
  }

  public getName(): string {
    return this.firstName;
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

  public getCNum(): CNum {
    return this.CNum;
  }

  public changeId(id: SpecialistId): void {
    this.id = id;
  }

  public changeName(firstName: string): void {
    this.firstName = firstName;
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

  public changeCNum(CNum: CNum): void {
    this.CNum = CNum;
  }
}
