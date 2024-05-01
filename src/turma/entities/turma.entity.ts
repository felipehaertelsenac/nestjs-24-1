import { Aluno } from "src/aluno/entities/aluno.entity"
import { Professor } from "src/professor/entities/professor.entity"
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Turma {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    ano: number

    @Column()
    semestre: number

    @ManyToOne(() => Professor, professor => professor.turmas)
    professor: Professor;

    @ManyToMany(() => Aluno, aluno => aluno.turmas)
    alunos: Aluno[];

    @Column()
    curso: string

    @CreateDateColumn()
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string
}
