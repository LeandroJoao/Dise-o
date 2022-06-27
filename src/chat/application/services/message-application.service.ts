import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterMessageRequestDto } from '../dtos/request/register-message-request.dto';
import { RegisterMessageCommand } from '../commands/register-message.command';
import { RegisterMessageResponseDto } from '../dtos/response/register-message-response.dto';
import { RegisterMessageValidator } from '../validators/register-message.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

@Injectable()
export class MessagesApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerMessageValidator: RegisterMessageValidator,
  ) {}

  async register(
    registerMessageRequestDto: RegisterMessageRequestDto,
  ): Promise<Result<AppNotification, RegisterMessageResponseDto>> {
    const notification: AppNotification = await this.registerMessageValidator.validate(registerMessageRequestDto,);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerMessageCommand: RegisterMessageCommand = new RegisterMessageCommand(
      registerMessageRequestDto.from,
      registerMessageRequestDto.idChat,
      registerMessageRequestDto.message,
      registerMessageRequestDto.to,
      registerMessageRequestDto.timestamp,
    );
    const MessageId = await this.commandBus.execute(RegisterMessageCommand);
    const registerMessageResponseDto: RegisterMessageResponseDto = new RegisterMessageResponseDto(
      MessageId,
      registerMessageRequestDto.from,
      registerMessageRequestDto.idChat,
      registerMessageRequestDto.message,
      registerMessageRequestDto.to,
      registerMessageRequestDto.timestamp,
    );
    return Result.ok(registerMessageResponseDto);
  }
}