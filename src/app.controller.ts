import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { LowdbService } from './lowdb/lowdb.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Inject(LowdbService)
  // private lowdbService: LowdbService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('items')
  // async getAllItems() {
  //   return this.lowdbService.getAllItems();
  // }

  // @Post('items')
  // async createItem(@Body() item: any) {
  //   return this.lowdbService.createItem(item);
  // }

  // @Get('items/:id')
  // async getItemById(@Param('id') id: string) {
  //   return this.lowdbService.getItemById(id);
  // }

  // @Put('items/:id')
  // async updateItem(@Param('id') id: string, @Body() updatedItem: any) {
  //   return this.lowdbService.updateItem(id, updatedItem);
  // }

  // @Delete('items/:id')
  // async deleteItem(@Param('id') id: string) {
  //   return this.lowdbService.deleteItem(id);
  // }
}
