/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { NamesModule } from "./names/names.module";

@Module({
  imports: [NamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
