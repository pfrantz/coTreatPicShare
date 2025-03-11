import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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

    @ManyToOne(()=>User)
    @JoinColumn({name:"user_id"})
    user: User

    @OneToMany(() => Favourites, favourite => favourite.media)
    favourites: Favourites[];
}

@Entity({name: 'tbl_favourites'})
@Index(["user", "media"], { unique: true })
export class Favourites {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favourites)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Media, media => media.favourites)
    @JoinColumn({name: 'media_id'})
    media: Media;
}
