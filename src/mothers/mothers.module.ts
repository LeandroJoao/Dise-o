import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PadresController } from './api/mothers.controller';
import { PadresApplicationService } from './application/services/mothers-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadresTypeORM } from './infrastructure/persistence/typeorm/entities/mother.typeorm';
import { RegisterPadresValidator } from './application/validators/register-mother.validator';
import { RegisterPadresHandler } from './application/handlers/commands/register-mother.handler';
import { PadresRegisteredHandler } from './application/handlers/events/mother-registered.handler';
import { DeletePadresHandler } from './application/handlers/commands/delete-mother.handler';
import { UpdatePadresHandler } from './application/handlers/commands/update-mother.handler';
import { GetMotherByIdHandler } from './application/handlers/queries/get-mother-by-id.handler';
import { GetPadresHandler } from './application/handlers/queries/get-mothers.handler';
import { IdPadresValidator } from './application/validators/id-mother.validator';
import { UpdatePadresValidator } from './application/validators/update-mother.validator';

export const CommandHandlers = [
  RegisterPadresHandler,
  DeletePadresHandler,
  UpdatePadresHandler,
];
export const EventHandlers = [PadresRegisteredHandler];
export const QueryHandlers = [GetPadresHandler, GetMotherByIdHandler];
export const Validators = [
  RegisterPadresValidator,
  IdPadresValidator,
  UpdatePadresValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PadresTypeORM])],
  controllers: [PadresController],
  providers: [
    PadresApplicationService,
    RegisterPadresValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class PadresModule {}
