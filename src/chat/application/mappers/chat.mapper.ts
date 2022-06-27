import { ChatTypeORM } from '../../infrastructure/persistence/typeorm/entities/chat.typeorm';
import { Chat } from '../../domain/entities/chat.entity';
import { ChatIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/chat.id.typeorm';
import { PadresIdTypeORM } from '../../../mothers/infrastructure/persistence/typeorm/entities/mother.id.typeorm';
import { SpecialistIdTypeORM } from '../../../specialist/infrastructure/persistence/typeorm/entities/specialists.id.typeorm';

export class ChatMapper {
  public static toTypeORM(chat: Chat): ChatTypeORM {
    const chatTypeORM: ChatTypeORM = new ChatTypeORM();

    chatTypeORM.id = ChatIdTypeORM.from(chat.getId().getValue());
    chatTypeORM.motherId = PadresIdTypeORM.from(chat.getMotherId().getValue());
    chatTypeORM.obstetricianId = SpecialistIdTypeORM.from(
      chat.getObstetricianId().getValue(),
    );
    chatTypeORM.timestamp = chat.getTimestamp();

    return chatTypeORM;
  }
}
