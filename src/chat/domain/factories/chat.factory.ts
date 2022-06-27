import { Chat } from '../entities/chat.entity';
import { ChatId } from '../value-objects/chat-id.value';
import { PadresId } from '../../../mothers/domain/value-objects/mother-id.value';
import { SpecialistId } from '../../../specialist/domain/value-objects/specialist-id.value';

export class ChatFactory {
  public static createFrom(
    motherId: PadresId,
    obstetricianId: SpecialistId,
    timestamp: Date,
  ): Chat {
    return new Chat(ChatId.create(0), motherId, obstetricianId, timestamp);
  }

  public static withId(
    ChatId: ChatId,
    motherId: PadresId,
    obstetricianId: SpecialistId,
    timestamp: Date,
  ): Chat {
    return new Chat(ChatId, motherId, obstetricianId, timestamp);
  }
}
