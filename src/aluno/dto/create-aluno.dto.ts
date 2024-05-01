import { ArrayUnique, IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateAlunoDto {
    @IsNumber()
    usuarioId: number;

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    turmaIds: number[];
}
