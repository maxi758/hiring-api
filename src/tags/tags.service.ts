import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private tagRepository: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    return this.tagRepository.save(createTagDto);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    const tag = this.tagRepository.findOne(id);
    if (!tag) throw new NotFoundException('tag not found');
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tagToUpdate = await this.findOne(id);
    if (!tagToUpdate) throw new NotFoundException('tag not found');
    return this.tagRepository.save({
      ...tagToUpdate,
      ...updateTagDto,
    });
  }

  remove(id: number) {
    return this.tagRepository.delete(id);
  }
}
