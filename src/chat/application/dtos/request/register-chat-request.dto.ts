export class RegisterChatRequestDto {
  constructor(
    public readonly motherId: number,
    public readonly obstetraId: number,
    public readonly timestamp: Date,
  ) {}
}
