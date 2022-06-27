export class RegisterPadresRequestDto {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string
  ) {}
}