import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuItem } from './menuitem.entity';

@Injectable()
export class MenuService {
  constructor(
    @Inject('MENU_REPOSITORY')
    private readonly menuRepository: Repository<MenuItem>,
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuRepository.find();
  }

  findOne(id: string): Promise<MenuItem> {
    return this.menuRepository.findOne(id);
  }
}
