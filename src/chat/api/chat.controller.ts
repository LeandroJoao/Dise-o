import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterChatRequestDto } from '../application/dtos/request/register-chat-request.dto';
import { RegisterChatResponseDto } from '../application/dtos/response/register-chat-response.dto';
import { ChatsApplicationService } from '../application/services/chat-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetChatsQuery } from '../application/queries/get-chat.query';
import { RegisterMessageResponseDto } from '../application/dtos/response/register-message-response.dto';
import { RegisterMessageRequestDto } from '../application/dtos/request/register-message-request.dto';
import { MessagesApplicationService } from '../application/services/message-application.service';

@Controller('chat')
export class ChatsController {
  constructor(
    private readonly ChatApplicationService: ChatsApplicationService,
    private readonly MessageApplicationService: MessagesApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async registerChat(
    @Body() registerChatRequestDto: RegisterChatRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterChatResponseDto> = await this.ChatApplicationService.register(registerChatRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  async sendMessage(
    @Body() registerMessageRequestDto: RegisterMessageRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterMessageResponseDto> = await this.MessageApplicationService.register(registerMessageRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getChat(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const chat = await this.queryBus.execute(new GetChatsQuery());
      return ApiController.ok(response, chat);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}