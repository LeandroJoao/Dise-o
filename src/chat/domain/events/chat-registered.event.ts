export class ChatRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly motherId: number,
    public readonly obstetricianId: number,
    public readonly timestamp: Date,
  ) {}
}
