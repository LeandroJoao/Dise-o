import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(email: string): Result<AppNotification, Email>
  {
    let notification: AppNotification = new AppNotification();
    email = (email ?? "").trim();
    const emailMaxLength = 150;
    if (email === "") {
      notification.addError('El email es necesario', null);
    }
    if (email.length > emailMaxLength) {
      notification.addError('La longitud maxima de un correo electronico es de ' + emailMaxLength + ' caracteres incluyendo espacios', null);
    }
    const regExp = new RegExp('^(.+)@(.+)$');
    if (regExp.test(email) === false) {
      notification.addError('El formato de correo electronico no es valido', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Email(email));
  }

  public getValue(): string {
    return this.value;
  }
}