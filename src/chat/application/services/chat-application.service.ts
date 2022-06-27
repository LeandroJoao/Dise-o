import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterChatRequestDto } from '../dtos/request/register-chat-request.dto';
import { RegisterChatCommand } from '../commands/register-chat.command';
import { RegisterChatResponseDto } from '../dtos/response/register-chat-response.dto';
import { RegisterChatValidator } from '../validators/register-chat.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

@Injectable()
export class ChatsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerChatValidator: RegisterChatValidator,
  ) {}

  async register(
    registerChatRequestDto: RegisterChatRequestDto,
  ): Promise<Result<AppNotification, RegisterChatResponseDto>> {
    const notification: AppNotification = await this.registerChatValidator.validate(registerChatRequestDto,);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerChatCommand: RegisterChatCommand = new RegisterChatCommand(
      registerChatRequestDto.motherId,
      registerChatRequestDto.obstetraId,
      registerChatRequestDto.timestamp,
    );
    const ChatId = await this.commandBus.execute(RegisterChatCommand);
    const registerChatResponseDto: RegisterChatResponseDto = new RegisterChatResponseDto(
      ChatId,
      registerChatRequestDto.motherId,
      registerChatRequestDto.obstetraId,
      registerChatRequestDto.timestamp,
    );
    return Result.ok(registerChatResponseDto);
  }
}