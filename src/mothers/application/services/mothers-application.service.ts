import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterPadresRequestDto } from "../dtos/request/register-mother-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterPadresResponseDto } from "../dtos/response/register-mother-response.dto";
import { Result } from "typescript-result";
import { RegisterPadresValidator } from "../validators/register-mother.validator";
import { RegisterPadresCommand } from '../commands/register-mother.command';
import { IdPadresValidator } from '../validators/id-mother.validator';
import { UpdatePadresValidator } from '../validators/update-mother.validator';
import { GetPadresByIdResponseDto } from '../dtos/response/get-mother-by-id-response.dto';
import { GetPadresByIdQuery } from '../queries/get-mother-by-id.query';
import { UpdatePadresRequestDto } from '../dtos/request/update-mother-request.dto';
import { UpdatePadresResponseDto } from '../dtos/response/update-mother-response.dto';
import { UpdatePadresCommand } from '../commands/update-mother.command';
import { DeletePadresResponseDto } from '../dtos/response/delete-mother-response.dto';
import { DeletePadresCommand } from '../commands/delete-mother.command';

@Injectable()
export class PadresApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerPadresValidator: RegisterPadresValidator,
    private idValidator: IdPadresValidator,
    private updatePadresValidator: UpdatePadresValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetPadresByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getPadresByIdQuery: GetPadresByIdQuery = new GetPadresByIdQuery(
      id,
    );

    const PadresTypeORM = await this.queryBus.execute(getPadresByIdQuery);

    const getByIdResponseDto: GetPadresByIdResponseDto =
      new GetPadresByIdResponseDto(
        PadresTypeORM.id.value,
        PadresTypeORM.name,
        PadresTypeORM.lastName,
        PadresTypeORM.email.value,
        PadresTypeORM.password.value,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerPadresRequestDto: RegisterPadresRequestDto,
  ): Promise<Result<AppNotification, RegisterPadresResponseDto>> {
    const notification: AppNotification = await this.registerPadresValidator.validate(registerPadresRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    //Registro de la madre
    const registerPadresCommand: RegisterPadresCommand =
      new RegisterPadresCommand(
      registerPadresRequestDto.name,
      registerPadresRequestDto.lastName,
      registerPadresRequestDto.email,
      registerPadresRequestDto.password,
    );
    const padresId = await this.commandBus.execute(registerPadresCommand);

    const registerPadresResponseDto: RegisterPadresResponseDto =
      new RegisterPadresResponseDto(
      padresId,
      registerPadresRequestDto.name,
      registerPadresRequestDto.lastName,
      registerPadresRequestDto.email,
      registerPadresRequestDto.password,
    );
    return Result.ok(registerPadresResponseDto);
  }

  async update(
    id: number,
    updatePadresRequestDto: UpdatePadresRequestDto,
  ): Promise<Result<AppNotification, UpdatePadresResponseDto>> {
    const notification: AppNotification =
      await this.updatePadresValidator.validate(id, updatePadresRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updatePadresCommand: UpdatePadresCommand = new UpdatePadresCommand(
      id,
      updatePadresRequestDto.id,
      updatePadresRequestDto.name,
      updatePadresRequestDto.lastName,
      updatePadresRequestDto.email,
      updatePadresRequestDto.password,
    );
    const padresTypeORM = await this.commandBus.execute(
      updatePadresCommand,
    );

    const updatePadresResponseDto: UpdatePadresResponseDto =
      new UpdatePadresResponseDto(
        padresTypeORM.id.value,
        padresTypeORM.name.value,
        padresTypeORM.lastName.value,
        padresTypeORM.email.value,
        padresTypeORM.password.value,
      );

    return Result.ok(updatePadresResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeletePadresResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deletePadresCommand: DeletePadresCommand =
      new DeletePadresCommand(id);

    const padresTypeORM = await this.commandBus.execute(
      deletePadresCommand,
    );

    const deletePadresResponseDto: DeletePadresResponseDto =
      new DeletePadresResponseDto(
        padresTypeORM.id.value,
        padresTypeORM.name.value,
        padresTypeORM.lastName.value,
        padresTypeORM.email.value,
        padresTypeORM.password.value,
      );

    return Result.ok(deletePadresResponseDto);
  }

}