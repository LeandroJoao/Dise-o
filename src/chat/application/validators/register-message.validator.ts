import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterMessageRequestDto } from '../dtos/request/register-message-request.dto';
import { Repository } from 'typeorm';
import { MessageTypeORM } from '../../infrastructure/persistence/typeorm/entities/message.typeorm';

@Injectable()
export class RegisterMessageValidator {
  constructor(
    @InjectRepository(MessageTypeORM)
    private MessageRepository: Repository<MessageTypeORM>,
  ) {
  }

  public async validate(
    registerMessageRequestDto: RegisterMessageRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    
    /*const from: string = registerCustomerRequestDto.from.toFixed();
    if (from.length <= 0) {
      notification.addError('UserType From is required', null);
    }
    const idChat: string = registerCustomerRequestDto.idChat.toFixed();
    if (idChat.length <= 0) {
      notification.addError('FromID is required', null);
    }
    const message: string = registerCustomerRequestDto.message.trim();
    if (message.length <= 0) {
      notification.addError('Message is required', null);
    }
    const to: string = registerCustomerRequestDto.to.toFixed();
    if (to.length <= 0) {
      notification.addError('UserType To is required', null);
    }
    const timestamp: string = registerCustomerRequestDto.timestamp.toTimeString();
    if (timestamp.length <= 0) {
      notification.addError('Time is required', null);
    }*/
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}