import { Controller, Get } from '@nestjs/common';
import { MenuItem } from './MenuItem';

@Controller('menu')
export class MenuController {
    @Get()
    GetMenu(): MenuItem[] {
        return exampleMenu;
    }
}

const exampleMenu: MenuItem[] = [
    {
        Name: 'Calzone',
        Category: 'Pizza',
        Price: 10
    },
    {
        Name: 'Peperoni',
        Category: 'Pizza',
        Price: 15
    }
]