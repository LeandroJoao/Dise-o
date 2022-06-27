export class MessageRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly chatId: number,
    public readonly to: number,
    public readonly from: number,
    public readonly message: string,
    public readonly timestamp: Date,
  ) {}
}
