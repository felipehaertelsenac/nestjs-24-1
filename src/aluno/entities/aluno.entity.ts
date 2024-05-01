import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { Turma } from "src/turma/entities/turma.entity"

@Entity()
export class Aluno {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario

    @ManyToMany(() => Turma, turma => turma.alunos)
    @JoinTable()
    turmas: Turma[];
}
