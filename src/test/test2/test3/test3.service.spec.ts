import { Test, TestingModule } from '@nestjs/testing';
import { Test3Service } from './test3.service';

describe('Test3Service', () => {
  let service: Test3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Test3Service],
    }).compile();

    service = module.get<Test3Service>(Test3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
