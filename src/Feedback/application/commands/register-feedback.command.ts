export class RegisterFeedbackCommand {
  constructor(
    public readonly fatherId: number,
    public readonly specialist: number,
    public readonly timestamp: Date,
  ) {}
}