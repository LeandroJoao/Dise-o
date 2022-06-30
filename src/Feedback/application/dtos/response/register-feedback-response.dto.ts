export class RegisterFeedbackResponseDto {
  constructor(
    public id: number,
    public readonly fatherId: number,
    public readonly specialistId: number,
    public readonly timestamp: Date,
  ) {}
}
