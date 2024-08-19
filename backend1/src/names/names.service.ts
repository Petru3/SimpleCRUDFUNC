/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Name } from "./names.model";

@Injectable()
export class NamesService {
    private names: Name[] = [];    

    getAllNames(): Name[] {
        return this.names;
    }

    createName(name: Omit<Name, 'id'>): Name {
        const newName = { id: (Math.random() + 1).toString(36).substring(2), ...name };
        this.names.push(newName);
        return newName;
    }

    updateName(id: string, updatedName: Omit<Name, 'id'>): Name {
        const index = this.names.findIndex(name => name.id === id);
        if (index === -1) {
            throw new NotFoundException(`Name with id ${id} not found`);
        }
        this.names[index] = { id, ...updatedName };
        return this.names[index];
    }

    deleteName(id: string): void {
        const index = this.names.findIndex(name => name.id === id);
        if (index === -1) {
            throw new NotFoundException(`Name with id ${id} not found`);
        }
        this.names.splice(index, 1);
    }
}
