import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../users/entities/user.entities";

@Entity({name: 'tbl_media'})
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    title: string;

    @Column()
    owner_id: number

    @OneToOne(() => User)
    @JoinColumn()
    username: User
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
