import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';

export class CNum {
  private readonly CNum: number;
  private static MIN_CNUM = 10000 ;

  private constructor(CNum: number) {
    this.CNum = CNum;
  }

  public getCNum(): number {
    return this.CNum;
  }

  public static create(
    Cnum: number,
  ): Result<AppNotification, CNum> {
    const notification: AppNotification = new AppNotification();

    Cnum = (Cnum ?? 0);

    if (Cnum < this.MIN_CNUM) {
      notification.addError(
        `The age entered must be greater than ${this.MIN_CNUM} years old`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new CNum(Cnum));
  }
}