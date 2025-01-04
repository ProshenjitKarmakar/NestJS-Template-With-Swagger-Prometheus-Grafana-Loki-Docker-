import { Module } from '@nestjs/common';
import { Test3Service } from './test3.service';
import { Test3Controller } from './test3.controller';

@Module({
  controllers: [Test3Controller],
  providers: [Test3Service],
})
export class Test3Module {}
