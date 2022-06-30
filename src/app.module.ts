import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PadresModule } from "./mothers/mothers.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecialistsModule } from './Specialist/specialists.module';
import { FeedbacksModule } from './Feedback/chat.module';

@Module({
  imports: [PadresModule, SpecialistsModule, FeedbacksModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
