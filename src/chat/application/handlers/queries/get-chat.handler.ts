import { GetChatsQuery } from '../../queries/get-chat.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetChatDto } from '../../dtos/queries/get-chat.dto';

@QueryHandler(GetChatsQuery)
export class GetChatsHandler implements IQueryHandler<GetChatsQuery> {
  constructor() {}

  async execute(query: GetChatsQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      customers
    ORDER BY
      last_name, first_name;`;
    const ormChat = await manager.query(sql);
    if (ormChat.length <= 0) {
      return [];
    }
    const chats: GetChatDto[] = ormChat.map(function (ormChat) {
      let chatDto = new GetChatDto();
      chatDto.id = Number(ormChat.id);
      chatDto.motherId = ormChat.motherId;
      chatDto.obstetraId = ormChat.obstetraId;
      chatDto.timestamp = ormChat.timestamp;
      return chatDto;
    });
    return chats;
  }
}