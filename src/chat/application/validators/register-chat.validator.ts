import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterChatRequestDto } from '../dtos/request/register-chat-request.dto';
import { Repository } from 'typeorm';
import { ChatTypeORM } from '../../infrastructure/persistence/typeorm/entities/chat.typeorm';

@Injectable()
export class RegisterChatValidator {
  constructor(
    @InjectRepository(ChatTypeORM)
    private ChatRepository: Repository<ChatTypeORM>,
  ) {
  }

  public async validate(
    registerChatRequestDto: RegisterChatRequestDto,
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