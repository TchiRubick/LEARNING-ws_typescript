import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Descriptionentity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public description: string;

    @Column()
    public linkfb: string;

    @Column()
    public linklinkedin: string;

    @Column()
    public linkgithub: string;

    @Column()
    public number: string;

    @Column()
    public pic: string;

    @Column()
    public poste: string;

    @Column()
    public pseudo: string;

    @Column()
    public user: string;

    @Column()
    public utilisateur: string;

}
