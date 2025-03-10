import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../users/entities/user.entities";

@Entity({name: 'tbl_media'})
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    title: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    created: Date

    @ManyToOne(()=>User, {eager: true})
    @JoinColumn()
    user: User
}

@Entity({name: 'tbl_favourites'})
export class Favourites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    media_id: number;

    @Column()
    user_id: number
}
