import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteDTO } from './clienteDTO';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>
    ) { }


    public async getAll(): Promise<Cliente[]> {
        try {
            const result: Cliente[] = await this.clienteRepository.find();
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getById(id: number): Promise<Cliente> {
        console.log("Getting Product id: " + id);
        try {
            const producto: Cliente = await this.clienteRepository.findOne(id);
            return producto;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async addClient(newCliente: ClienteDTO): Promise<Cliente> {
        try {
            const clienteCreado: Cliente = await this.clienteRepository.save(new Cliente(

                newCliente.idCliente,
                newCliente.razonSocial,
                newCliente.cuit
            )
            )

            if (clienteCreado.getIdCliente()) {

                return clienteCreado;
            } else {
                throw new HttpException('No se pudo crear el producto', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }


    public async updateCliente(id: number, clienteDTO: ClienteDTO): Promise<Cliente[]> {
        const cliente: Cliente = await this.clienteRepository.findOne(id);
        if (!cliente) {
            throw new HttpException('el cliente no existe!', 404);
        } else {
            cliente.setIdCliente(clienteDTO.idCliente); //= clienteDTO.getNombre();
            cliente.setRazonSocial(clienteDTO.razonSocial);// = clienteDTO.getApellido();
            cliente.setCuit(clienteDTO.cuit);// = clienteDTO.getDireccion();

            await this.clienteRepository.save(cliente);
            return;
        }
    }
    public async deleteClient(idCliente: number): Promise<string> {
        const cte: Cliente = await this.clienteRepository.findOne(idCliente);
        if (!cte) {
            throw new HttpException('el cliente no existe!', 404);
        } else {
            //await this.asistenciaRepository.query("delete from asistencia where idPers =" + idPers);
            await this.clienteRepository.delete(idCliente);
            return ("Cliente eliminado correctamente");
        }
    }



}


