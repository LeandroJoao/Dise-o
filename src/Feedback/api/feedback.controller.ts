import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterFeedbackRequestDto } from '../application/dtos/request/register-feedback-request.dto';
import { RegisterFeedbackResponseDto } from '../application/dtos/response/register-feedback-response.dto';
import { FeedbacksApplicationService } from '../application/services/feedback-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeedbacksQuery } from '../application/queries/get-feedback.query';
import { RegisterMessageResponseDto } from '../application/dtos/response/register-message-response.dto';
import { RegisterMessageRequestDto } from '../application/dtos/request/register-message-request.dto';
import { MessagesApplicationService } from '../application/services/message-application.service';

@Controller('chat')
export class FeedbacksController {
  constructor(
    private readonly FeedbackApplicationService: FeedbacksApplicationService,
    private readonly MessageApplicationService: MessagesApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async registerFeedback(
    @Body() registerFeedbackRequestDto: RegisterFeedbackRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterFeedbackResponseDto> = await this.FeedbackApplicationService.register(registerFeedbackRequestDto);
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
  async getFeedback(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const chat = await this.queryBus.execute(new GetFeedbacksQuery());
      return ApiController.ok(response, chat);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}