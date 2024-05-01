import { Turma } from "src/turma/entities/turma.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Professor {

    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario

    @OneToMany(() => Turma, turma => turma.professor)
    turmas: Turma[];
}
