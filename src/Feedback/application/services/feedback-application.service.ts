import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterFeedbackRequestDto } from '../dtos/request/register-feedback-request.dto';
import { RegisterFeedbackCommand } from '../commands/register-feedback.command';
import { RegisterFeedbackResponseDto } from '../dtos/response/register-feedback-response.dto';
import { RegisterFeedbackValidator } from '../validators/register-feedback.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

@Injectable()
export class FeedbacksApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerFeedbackValidator: RegisterFeedbackValidator,
  ) {}

  async register(
    registerFeedbackRequestDto: RegisterFeedbackRequestDto,
  ): Promise<Result<AppNotification, RegisterFeedbackResponseDto>> {
    const notification: AppNotification = await this.registerFeedbackValidator.validate(registerFeedbackRequestDto,);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerFeedbackCommand: RegisterFeedbackCommand = new RegisterFeedbackCommand(
      registerFeedbackRequestDto.fatherId,
      registerFeedbackRequestDto.specialistId,
      registerFeedbackRequestDto.timestamp,
    );
    const FeedbackId = await this.commandBus.execute(RegisterFeedbackCommand);
    const registerFeedbackResponseDto: RegisterFeedbackResponseDto = new RegisterFeedbackResponseDto(
      FeedbackId,
      registerFeedbackRequestDto.fatherId,
      registerFeedbackRequestDto.specialistId,
      registerFeedbackRequestDto.timestamp,
    );
    return Result.ok(registerFeedbackResponseDto);
  }
}