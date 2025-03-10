import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Favourites, Media} from "../../media/entities/media.entity";

@Entity({name: 'tbl_user'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => Media, (media) => media.user)
    media: Media[];

    //@OneToMany(() => Favourites, (fav) => fav.user)
    //favourites: Favourites[];
}
