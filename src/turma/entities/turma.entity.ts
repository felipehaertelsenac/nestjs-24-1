import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

    @Column()
    professor: string

    @Column()
    curso: string

    @CreateDateColumn()
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string
}
