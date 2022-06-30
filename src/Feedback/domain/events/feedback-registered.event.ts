export class FeedbackRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly fatherId: number,
    public readonly specialistId: number,
    public readonly timestamp: Date,
  ) {}
}
