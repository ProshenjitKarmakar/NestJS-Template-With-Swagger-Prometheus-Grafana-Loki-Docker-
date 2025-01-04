import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import * as Joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { LoggingInterceptor } from "./logging.interceptor";
import { PrismaModule } from './prisma/prisma.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
      }),
      envFilePath: './../env',  // Explicitly specify the .env file path
    }),
    PrometheusModule.register({
      path: '/metrics'
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}
