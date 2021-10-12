import { Inject, Injectable } from '@nestjs/common';
import { Providers } from 'src/providers';
import { Repository } from 'typeorm';
import { MenuItem } from './menuitem.entity';

@Injectable()
export class MenuService {
  constructor(
    @Inject(Providers.MenuRepository)
    private readonly menuRepository: Repository<MenuItem>,
  ) { }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuRepository.find();
  }

  async findOne(id: string): Promise<MenuItem> {
    return await this.menuRepository.findOne(id);
  }
}
