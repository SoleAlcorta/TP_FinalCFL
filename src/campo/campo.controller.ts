import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CampoDTO } from './campo.dto';
import { Campo } from './campo.entity';
import { CampoService } from './campo.service';
import { Campo_conIdDTO } from './campo_conId.dto';

@Controller('campo')
export class CampoController {
    constructor(private readonly campoService : CampoService) {}

    @Get()
    public async getCampos(): Promise<Campo[]> {
        return await this.campoService.getCampos();
    }
    @Get(':id')
    public async getCampo(@Param('id') id: string): Promise<Campo> {
        return await this.campoService.getCampo(parseInt(id));
    }
    @Post("new-campo")
    createCampo(@Body() campoDto: CampoDTO): Promise<Campo[]> {
    return this.campoService.addCampo(campoDto);
    }
    @Put(':id')
    public async updCampo(@Body() campo_conIdDTO: Campo_conIdDTO): Promise<Campo[]> { 
        return await this.campoService.updCampo(campo_conIdDTO);  
    }
    @Delete(':id')  
    public delCampo(@Param('id') id: string): Promise<Campo[]> {
        return this.campoService.delCampo(parseInt(id));
    }
}
