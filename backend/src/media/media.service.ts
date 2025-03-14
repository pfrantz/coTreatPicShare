import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, OrderByCondition, Repository} from "typeorm";
import {Favourites, Media} from "./entities/media.entity";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {User} from "../users/entities/user.entities";


@Injectable()
export class MediaService {
  constructor(
      private dataSource: DataSource,
      @InjectRepository(Media)
      private mediaRepository: Repository<Media>,
      @InjectRepository(Favourites)
      private favoritesRepository: Repository<Favourites>,
  ) {}

  async create(user: User, createMediaDto: CreateMediaDto): Promise<Media> {
    let media = new Media();
    media.title = createMediaDto.title;
    media.url = createMediaDto.url;
    media.user = user;

    return this.mediaRepository.save(media);
  }

  async findAll(user: User | null, options: FindManyOptions<Media>) {
      // nice and efficient way to get the media with the user who created it and if it's a favourite for the user
      // all in one query and minimal data processing
      let query = this.mediaRepository.createQueryBuilder('media').leftJoinAndSelect('media.user', 'user');

      let fields = [
          'media.id as id',
          'media.url as url',
          'media.title as title',
          'media.created as created',
          'user.id as createdById',
          'user.username as createdBy'
      ];

      // add the is favourite field if user is provided
      if (user) {
          query = query.leftJoinAndSelect('media.favourites', 'favourites', 'favourites.user_id = :user_id', { user_id: user.id })
          fields.push('CASE WHEN favourites.id IS NOT NULL THEN true ELSE false END AS isFavourite')
      }

      return query
          .select(fields)
          .limit(options.take)
          .offset(options.skip)
          .orderBy(options.order as OrderByCondition)
          .getRawMany();
  }

  async findOne(id: number) {
    return this.mediaRepository.findOneBy({id})
  }

  async update(id: number, user: User, updateMediaDto: UpdateMediaDto) {
      let media = await this.mediaRepository.findOneBy({id});
      if (!media) {
          return null
      }

      //@ts-ignore
      let favourite = await this.favoritesRepository.findOneBy({
          media: { id: media.id },
          user: { id: user.id }
      });

      // deal with fav only if true/false - if null or undefined, do nothing. Explicit tests needed here
      if (!favourite && updateMediaDto.favourite === true) {
          let favourite = new Favourites();
          favourite.media = media;
          favourite.user = user;
          const res = await this.favoritesRepository.save(favourite);
      } else if (favourite && updateMediaDto.favourite === false) {
          await this.favoritesRepository.delete(favourite.id);
      }

      if (updateMediaDto.title || updateMediaDto.url) {

          if (updateMediaDto.title) {
              media.title = updateMediaDto.title;
          }
          if (updateMediaDto.url) {
              media.url = updateMediaDto.url;
          }
          await this.mediaRepository.save(media);
      }
      return {...media, favourite: updateMediaDto.favourite};
  }

    async remove(id: number) {
        return this.mediaRepository.delete(id);
    }
}
