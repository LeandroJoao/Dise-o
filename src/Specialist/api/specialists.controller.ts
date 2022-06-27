import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { SpecialistsApplicationService } from '../application/services/specialists-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetSpecialistsDto } from '../application/dtos/queries/get-specialists.dto';
import { GetSpecialistsQuery } from '../application/queries/get-specialists.query';
import { ApiController } from '../../common/api/api.controller';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { GetSpecialistByIdDto } from '../application/dtos/queries/get-specialist-by-id.dto';
import { RegisterSpecialistRequestDto } from '../application/dtos/request/register-specialist-request.dto';
import { RegisterSpecialistResponseDto } from '../application/dtos/response/register-specialist-response.dto';
import { UpdateSpecialistRequestDto } from '../application/dtos/request/update-specialist-request.dto';
import { UpdateSpecialistResponseDto } from '../application/dtos/response/update-specialist-response.dto';
import { DeleteSpecialistResponseDto } from '../application/dtos/response/delete-specialist-response.dto';

@ApiBearerAuth()
@ApiTags('specialists')
@Controller ('specialists')
export class SpecialistsController {
  constructor (
    private readonly specialistsApplicationService: SpecialistsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all specialist registered' })
  @ApiResponse({
    status: 200,
    description: 'All specialist returned',
    type: GetSpecialistsDto,
    isArray: true,
  })
  async getSpecialist(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const specialist = await this.queryBus.execute(new GetSpecialistsQuery());
      return ApiController.ok(response, specialist);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specialist by Id' })
  @ApiResponse({
    status: 200,
    description: 'Specialist returned',
    type: GetSpecialistsDto,
  })
  async getObstetricianById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetSpecialistByIdDto> =
        await this.specialistsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new user specialist' })
  @ApiResponse({
    status: 200,
    description: 'Specialist created',
    type: GetSpecialistsDto,
  })
  async register(
    @Body() registerSpecialistRequestDto: RegisterSpecialistRequestDto,
    @Res({ passthrough: true }) response,
  ):Promise<object> {
    try {
      const result: Result<AppNotification, RegisterSpecialistResponseDto> =
        await this.specialistsApplicationService.register(
          registerSpecialistRequestDto
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update specialist information' })
  @ApiResponse({
    status: 200,
    description: 'Specialist information updated',
    type: GetSpecialistsDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateSpecialistRequestDto: UpdateSpecialistRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateSpecialistResponseDto> =
        await this.specialistsApplicationService.update(
          id,
          updateSpecialistRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Specialist by Id' })
  @ApiResponse({
    status: 200,
    description: 'Specialist deleted',
    type: GetSpecialistsDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteSpecialistResponseDto> =
        await this.specialistsApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
