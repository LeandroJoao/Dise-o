import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { PadresApplicationService } from "../application/services/mothers-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { Result } from 'typescript-result';
import { RegisterPadresRequestDto } from "../application/dtos/request/register-mother-request.dto";
import { ApiController } from "../../common/api/api.controller";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterPadresResponseDto } from "../application/dtos/response/register-mother-response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPadresDto } from '../application/dtos/queries/get-mothers.dto';
import { GetPadresQuery } from '../application/queries/get-mothers.query';
import { GetPadresByIdDto } from '../application/dtos/queries/get-mother-by-id.dto';
import { UpdatePadresRequestDto } from '../application/dtos/request/update-mother-request.dto';
import { UpdatePadresResponseDto } from '../application/dtos/response/update-mother-response.dto';
import { DeletePadresResponseDto } from '../application/dtos/response/delete-mother-response.dto';

@ApiBearerAuth()
@ApiTags('padres')
@Controller ('padres')
export class PadresController {
  constructor (
    private readonly padresApplicationService: PadresApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Mothers registered' })
  @ApiResponse({
    status: 200,
    description: 'All mothers returned',
    type: GetPadresDto,
    isArray: true,
  })
  async getPadres(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const padres = await this.queryBus.execute(new GetPadresQuery());
      return ApiController.ok(response, padres);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Mother by Id' })
  @ApiResponse({
    status: 200,
    description: 'Mother returned',
    type: GetPadresDto,
  })
  async getPadresById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetPadresByIdDto> =
        await this.padresApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new user mother' })
  @ApiResponse({
    status: 200,
    description: 'Mother created',
    type: GetPadresDto,
  })
  async register(
    @Body() registerPadresRequestDto: RegisterPadresRequestDto,
    @Res({ passthrough: true }) response,
  ):Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPadresResponseDto> =
        await this.padresApplicationService.register(
          registerPadresRequestDto
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
  @ApiOperation({ summary: 'Update mother information' })
  @ApiResponse({
    status: 200,
    description: 'Mother information updated',
    type: GetPadresDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updatePadresRequestDto: UpdatePadresRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdatePadresResponseDto> =
        await this.padresApplicationService.update(
          id,
          updatePadresRequestDto,
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
  @ApiOperation({ summary: 'Delete Mother by Id' })
  @ApiResponse({
    status: 200,
    description: 'Mother deleted',
    type: GetPadresDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeletePadresResponseDto> =
        await this.padresApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
