import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Favourites} from "../../media/entities/media.entity";

@Entity({name: 'tbl_user'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => Favourites, (fav) => fav.media_id)
    favourites: Favourites[];
}
