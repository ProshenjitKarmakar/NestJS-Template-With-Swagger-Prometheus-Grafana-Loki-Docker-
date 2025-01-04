import { Injectable } from '@nestjs/common';
import { CreateTest3Dto } from './dto/create-test3.dto';
import { UpdateTest3Dto } from './dto/update-test3.dto';

@Injectable()
export class Test3Service {
  create(createTest3Dto: CreateTest3Dto) {
    return 'This action adds a new test3';
  }

  findAll() {
    return `This action returns all test3`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test3`;
  }

  update(id: number, updateTest3Dto: UpdateTest3Dto) {
    return `This action updates a #${id} test3`;
  }

  remove(id: number) {
    return `This action removes a #${id} test3`;
  }
}
