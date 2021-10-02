import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './menuitem.entity';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Get()
    async GetMenu(): Promise<MenuItem[]> {
        return await this.menuService.findAll();
    }
}
