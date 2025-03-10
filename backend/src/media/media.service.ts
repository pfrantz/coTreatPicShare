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
      if (user) {
          // goto figure how to join to favourites here
            return this.mediaRepository.find(options)
      }
      return this.mediaRepository.find(options);
  }

  async findOne(id: number) {
    return this.mediaRepository.findOneBy({id})
  }

  async update(id: number, user_id: number, updateMediaDto: UpdateMediaDto) {
    let media = await this.mediaRepository.findOneBy({ id });
    if (!media) {
       return null
    }

    // deal with fav only if true/false - if null or undefined, do nothing
    if (updateMediaDto.favourite === true) {
        let favourite = new Favourites();
        favourite.media_id = id;
        favourite.user_id = user_id;
        const res = await this.favoritesRepository.save(favourite);
        console.log(res);
    }
    else if (updateMediaDto.favourite === false) {
        let favourite = await this.favoritesRepository.findOneBy({ media_id: id, user_id });
        if (favourite) {
            await this.favoritesRepository.delete(favourite.id);
        }
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
    return { ...media, favourite: updateMediaDto.favourite };
  }

  async remove(id: number) {
    return this.mediaRepository.delete(id);
  }
}
