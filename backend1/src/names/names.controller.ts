/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { NamesService } from "./names.service";
import { Name } from "./names.model";

@Controller('api/data')
export class NamesController {
    constructor(private readonly nameService: NamesService) {}

    @Get()
    getAllNames() {
        return this.nameService.getAllNames();
    }

    @Post()
    createName(@Body() name: Omit<Name, 'id'>) {
        return this.nameService.createName(name);
    }

    @Put(':id')
    updateName(@Param('id') id: string, @Body() name: Omit<Name, 'id'>) {
        return this.nameService.updateName(id, name);
    }

    @Delete(':id')
    deleteName(@Param('id') id: string) {
        this.nameService.deleteName(id);
    }
}
