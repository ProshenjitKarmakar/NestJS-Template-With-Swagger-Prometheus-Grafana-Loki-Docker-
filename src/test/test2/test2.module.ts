import { Module } from '@nestjs/common';
import { Test2Service } from './test2.service';
import { Test2Controller } from './test2.controller';
import { Test3Module } from './test3/test3.module';

@Module({
  controllers: [Test2Controller],
  providers: [Test2Service],
  imports: [Test3Module],
})
export class Test2Module {}
