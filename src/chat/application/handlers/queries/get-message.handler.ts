import { GetMessagesQuery } from '../../queries/get-Message.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetMessageDto } from '../../dtos/queries/get-Message.dto';

@QueryHandler(GetMessagesQuery)
export class GetMessagesHandler implements IQueryHandler<GetMessagesQuery> {
  constructor() {}

  async execute(query: GetMessagesQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      chat_Id as chatId,
      from
      to
      message
      timestamp
    FROM 
      Messages
    ORDER BY
      id;
    `;
    const ormMessage = await manager.query(sql);
    if (ormMessage.length <= 0) {
      return [];
    }
    const Messages: GetMessageDto[] = ormMessage.map(function (ormMessage) {
      let MessageDto = new GetMessageDto();
      MessageDto.id = Number(ormMessage.id);
      MessageDto.chatId = ormMessage.chatId;
      MessageDto.from = ormMessage.from;
      MessageDto.to = ormMessage.to;
      MessageDto.message = ormMessage.message;
      MessageDto.timestamp = ormMessage.timestamp;
      return MessageDto;
    });
    return Messages;
  }
}