export class DeleteSpecialistResponseDto {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly CNum: number,
  ) {}
}