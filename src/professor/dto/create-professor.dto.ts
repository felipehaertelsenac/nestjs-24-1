import { IsNumber } from "class-validator";

export class CreateProfessorDto {

    @IsNumber()
    usuarioId: number
}
