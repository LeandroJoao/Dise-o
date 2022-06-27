import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterSpecialistValidator } from '../validators/register-specialist.validator';
import { IdSpecialistValidator } from '../validators/id-specialist.validator';
import { UpdateSpecialistValidator } from '../validators/update-specialist.validator';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { GetSpecialistByIdResponseDto } from '../dtos/response/get-specialist-by-id-response.dto';
import { GetSpecialistByIdQuery } from '../queries/get-specialist-by-id.query';
import { RegisterSpecialistRequestDto } from '../dtos/request/register-specialist-request.dto';
import { RegisterSpecialistResponseDto } from '../dtos/response/register-specialist-response.dto';
import { RegisterSpecialistCommand } from '../commands/register-specialist.command';
import { UpdateSpecialistRequestDto } from '../dtos/request/update-specialist-request.dto';
import { UpdateSpecialistResponseDto } from '../dtos/response/update-specialist-response.dto';
import { UpdateSpecialistCommand } from '../commands/update-specialist.command';
import { DeleteSpecialistResponseDto } from '../dtos/response/delete-specialist-response.dto';
import { DeleteSpecialistCommand } from '../commands/delete-specialist.command';

@Injectable()
export class SpecialistsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerSpecialistValidator: RegisterSpecialistValidator,
    private idValidator: IdSpecialistValidator,
    private updateSpecialistValidator: UpdateSpecialistValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetSpecialistByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getSpecialistByIdQuery: GetSpecialistByIdQuery = new GetSpecialistByIdQuery(
      id,
    );

    const specialistTypeORM = await this.queryBus.execute(getSpecialistByIdQuery);

    const getByIdResponseDto: GetSpecialistByIdResponseDto =
      new GetSpecialistByIdResponseDto(
        specialistTypeORM.id.value,
        specialistTypeORM.firstName,
        specialistTypeORM.lastName,
        specialistTypeORM.email.value,
        specialistTypeORM.password.value,
        specialistTypeORM.CNum.value,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerSpecialistRequestDto: RegisterSpecialistRequestDto,
  ): Promise<Result<AppNotification, RegisterSpecialistResponseDto>> {
    const notification: AppNotification = await this.registerSpecialistValidator.validate(registerSpecialistRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    //Registro
    const registerSpecialistCommand: RegisterSpecialistCommand =
      new RegisterSpecialistCommand(
        registerSpecialistRequestDto.firstName,
        registerSpecialistRequestDto.lastName,
        registerSpecialistRequestDto.email,
        registerSpecialistRequestDto.password,
        registerSpecialistRequestDto.CNum,
      );
    const specialistId = await this.commandBus.execute(registerSpecialistCommand);

    const registerSpecialistResponseDto: RegisterSpecialistResponseDto =
      new RegisterSpecialistResponseDto(
        specialistId,
        registerSpecialistRequestDto.firstName,
        registerSpecialistRequestDto.lastName,
        registerSpecialistRequestDto.email,
        registerSpecialistRequestDto.password,
        registerSpecialistRequestDto.CNum,
      );
    return Result.ok(registerSpecialistResponseDto);
  }

  async update(
    id: number,
    updateSpecialistRequestDto: UpdateSpecialistRequestDto,
  ): Promise<Result<AppNotification, UpdateSpecialistResponseDto>> {
    const notification: AppNotification =
      await this.updateSpecialistValidator.validate(id, updateSpecialistRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateSpecialistCommand: UpdateSpecialistCommand = new UpdateSpecialistCommand(
      id,
      updateSpecialistRequestDto.id,
      updateSpecialistRequestDto.firstName,
      updateSpecialistRequestDto.lastName,
      updateSpecialistRequestDto.email,
      updateSpecialistRequestDto.password,
      updateSpecialistRequestDto.CNum,
    );
    const specialistTypeORM = await this.commandBus.execute(
      updateSpecialistCommand,
    );

    const updateSpecialistResponseDto: UpdateSpecialistResponseDto =
      new UpdateSpecialistResponseDto(
        specialistTypeORM.id.value,
        specialistTypeORM.firstName.value,
        specialistTypeORM.lastName.value,
        specialistTypeORM.email.value,
        specialistTypeORM.password.value,
        specialistTypeORM.CNum.value,
      );

    return Result.ok(updateSpecialistResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteSpecialistResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteSpecialistCommand: DeleteSpecialistCommand =
      new DeleteSpecialistCommand(id);

    const specialistTypeORM = await this.commandBus.execute(
      deleteSpecialistCommand,
    );

    const deleteSpecialistResponseDto: DeleteSpecialistResponseDto =
      new DeleteSpecialistResponseDto(
        specialistTypeORM.id.value,
        specialistTypeORM.firstname.value,
        specialistTypeORM.lastName.value,
        specialistTypeORM.email.value,
        specialistTypeORM.password.value,
        specialistTypeORM.CNum.value,
      );

    return Result.ok(deleteSpecialistResponseDto);
  }

}