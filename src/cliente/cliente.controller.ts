import { Body, Controller, Post, Delete, Get, Param, Put } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { ClienteDTO } from './clienteDTO';
import { ClienteService } from './cliente.service';


@Controller('cliente')
export class ClienteController {
    public constructor(
        private readonly clienteService: ClienteService
    ) { }

    @Get()
    getClient(): Promise<Cliente[]> {
        return this.clienteService.getAll();

    }
    @Get(':id')
    public getClienteById (@Param('id') id:number):Promise<Cliente>{
        return this.clienteService.getById(id);
    }

    @Post()
    createClient(@Body() clienteDto: ClienteDTO): Promise<Cliente> {
        return this.clienteService.addClient(clienteDto);
    }


    @Delete(':id')
    public deleteClient(@Param('id') id): Promise<string> {
        return this.clienteService.deleteClient(parseInt(id));
    }
    @Put(':id')
    public updateCliente(@Param('id') id:number,@Body() cliente: ClienteDTO): Promise<Cliente[]> {
     return this.clienteService.updateCliente(id,cliente);
    }
}
