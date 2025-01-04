import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Test3Service } from './test3.service';
import { CreateTest3Dto } from './dto/create-test3.dto';
import { UpdateTest3Dto } from './dto/update-test3.dto';

@Controller('test3')
export class Test3Controller {
  constructor(private readonly test3Service: Test3Service) {}

  @Post()
  create(@Body() createTest3Dto: CreateTest3Dto) {
    return this.test3Service.create(createTest3Dto);
  }

  @Get()
  findAll() {
    return this.test3Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.test3Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTest3Dto: UpdateTest3Dto) {
    return this.test3Service.update(+id, updateTest3Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.test3Service.remove(+id);
  }
}
