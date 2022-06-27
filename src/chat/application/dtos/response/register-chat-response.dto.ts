export class RegisterChatResponseDto {
  constructor(
    public id: number,
    public readonly motherId: number,
    public readonly obstetraId: number,
    public readonly timestamp: Date,
  ) {}
}
