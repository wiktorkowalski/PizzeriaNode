import { Inject, Injectable } from '@nestjs/common';
import { Providers } from 'src/providers';
import { Repository } from 'typeorm';
import { ExampleMenuItems } from './exampleMenu';
import { MenuItem } from './menuitem.entity';

@Injectable()
export class MenuService {
  constructor(
    @Inject(Providers.MenuRepository)
    private readonly menuRepository: Repository<MenuItem>,
  ) {
    this.seedMenu();
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuRepository.find();
  }

  async findOne(id: string): Promise<MenuItem> {
    return await this.menuRepository.findOne(id);
  }

  async seedMenu() {
    if (await this.menuRepository.count() === 0) {
      this.menuRepository.save(ExampleMenuItems);
      console.debug('MenuItem table content was autofilled');
    }
  }
}
