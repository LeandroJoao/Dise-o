export class RegisterMessageCommand {
  constructor(
    public readonly from: number,
    public readonly idChat: number,
    public readonly message: string,
    public readonly to: number,
    public readonly timestamp: Date,
  ) {}
}