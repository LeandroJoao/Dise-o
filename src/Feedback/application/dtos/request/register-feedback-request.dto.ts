export class RegisterFeedbackRequestDto {
  constructor(
    public readonly fatherId: number,
    public readonly specialistId: number,
    public readonly timestamp: Date,
  ) {}
}
