export class RegisterChatCommand {
  constructor(
    public readonly motherId: number,
    public readonly obstetra: number,
    public readonly timestamp: Date,
  ) {}
}