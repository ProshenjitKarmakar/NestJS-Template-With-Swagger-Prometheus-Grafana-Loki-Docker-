import { Test, TestingModule } from '@nestjs/testing';
import { Test3Controller } from './test3.controller';
import { Test3Service } from './test3.service';

describe('Test3Controller', () => {
  let controller: Test3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Test3Controller],
      providers: [Test3Service],
    }).compile();

    controller = module.get<Test3Controller>(Test3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
