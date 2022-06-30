import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterFeedbackRequestDto } from '../dtos/request/register-feedback-request.dto';
import { Repository } from 'typeorm';
import { FeedbackTypeORM } from '../../infrastructure/persistence/typeorm/entities/feedback.typeorm';

@Injectable()
export class RegisterFeedbackValidator {
  constructor(
    @InjectRepository(FeedbackTypeORM)
    private FeedbackRepository: Repository<FeedbackTypeORM>,
  ) {
  }

  public async validate(
    registerFeedbackRequestDto: RegisterFeedbackRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    
    /*const motherId: string = registerCustomerRequestDto.motherId.toFixed();
    if (motherId.length <= 0) {
      notification.addError('motherId is required', null);
    }
    const obstetraId: string = registerCustomerRequestDto.obstetraId.toFixed();
    if (obstetraId.length <= 0) {
      notification.addError('obstetraId is required', null);
    }*/
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}