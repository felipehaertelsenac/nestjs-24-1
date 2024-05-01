import { ArrayUnique, IsArray, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTurmaDto {

    @IsString()
    nome: string

    @IsNumber()
    ano: number

    @IsNumber()
    semestre: number

    @IsString()
    curso: string

    @IsNumber()
    @IsOptional()
    professorId?: number

    @IsArray()
    @ArrayUnique()
    @IsOptional()
    alunoIds?: number[];

}
