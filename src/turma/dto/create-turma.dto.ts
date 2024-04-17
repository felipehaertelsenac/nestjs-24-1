import { IsInt, IsNumber, IsString } from "class-validator"

export class CreateTurmaDto {

    @IsString()
    nome: string

    @IsNumber()
    ano: number

    @IsNumber()
    semestre: number

    @IsString()
    professor: string

    @IsString()
    curso: string

}
