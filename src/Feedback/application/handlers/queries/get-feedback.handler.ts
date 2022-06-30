import { GetFeedbacksQuery } from '../../queries/get-feedback.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetFeedbackDto } from '../../dtos/queries/get-feedback.dto';

@QueryHandler(GetFeedbacksQuery)
export class GetFeedbacksHandler implements IQueryHandler<GetFeedbacksQuery> {
  constructor() {}

  async execute(query: GetFeedbacksQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      customers
    ORDER BY
      last_name, first_name;`;
    const ormFeedback = await manager.query(sql);
    if (ormFeedback.length <= 0) {
      return [];
    }
    const feedbacks: GetFeedbackDto[] = ormFeedback.map(function (ormFeedback) {
      let feedbackDto = new GetFeedbackDto();
      feedbackDto.id = Number(ormFeedback.id);
      feedbackDto.fatherId = ormFeedback.fatherId;
      feedbackDto.specialistId = ormFeedback.specialistId;
      feedbackDto.timestamp = ormFeedback.timestamp;
      return feedbackDto;
    });
    return feedbacks;
  }
}