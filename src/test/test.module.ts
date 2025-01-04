import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test2Module } from './test2/test2.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [Test2Module],
})
export class TestModule {}
