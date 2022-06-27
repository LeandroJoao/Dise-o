import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteSpecialistHandler } from './application/handlers/commands/delete-specialist.handler';
import { GetSpecialistsHandler } from './application/handlers/queries/get-specialists.handler';
import { GetSpecialistByIdHandler } from './application/handlers/queries/get-specialist-by-id-handler';
import { RegisterSpecialistValidator } from './application/validators/register-specialist.validator';
import { IdSpecialistValidator } from './application/validators/id-specialist.validator';
import { UpdateSpecialistValidator } from './application/validators/update-specialist.validator';
import { SpecialistTypeORM } from './infrastructure/persistence/typeorm/entities/specialist.typeorm';
import { RegisterSpecialistHandler } from './application/handlers/commands/register-specialist.handler';
import { UpdateSpecialistHandler } from './application/handlers/commands/update-specialist.handler';
import { SpecialistRegisteredHandler } from './application/handlers/events/specialist-registered.handler';
import { SpecialistsApplicationService } from './application/services/specialists-application.service';
import { SpecialistsController } from './api/specialists.controller';

export const CommandHandlers = [
  RegisterSpecialistHandler,
  DeleteSpecialistHandler,
  UpdateSpecialistHandler,
];
export const EventHandlers = [SpecialistRegisteredHandler];
export const QueryHandlers = [GetSpecialistsHandler, GetSpecialistByIdHandler];
export const Validators = [
  RegisterSpecialistValidator,
  IdSpecialistValidator,
  UpdateSpecialistValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([SpecialistTypeORM])],
  controllers: [SpecialistsController],
  providers: [
    SpecialistsApplicationService,
    RegisterSpecialistValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class SpecialistsModule {}