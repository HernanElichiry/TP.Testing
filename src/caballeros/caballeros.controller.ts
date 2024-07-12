// src/caballeros/caballeros.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CaballerosService } from './caballeros.service';
import { Caballero } from './interface/caballero.interface'; 

@Controller('caballeros')
export class CaballerosController {
  constructor(private readonly caballerosService: CaballerosService) {}

  @Get()
  getAllCaballeros(): Caballero[] {
    return this.caballerosService.getAllCaballeros();
  }

  @Get(':id')
  getCaballeroById(@Param('id') id: number): Caballero {
    return this.caballerosService.getCaballeroById(id);
  }

  @Post()
  addCaballero(@Body() caballero: Caballero): Caballero {
    return this.caballerosService.addCaballero(caballero);
  }

  @Put(':id')
  updateCaballero(@Param('id') id: number, @Body() caballero: Partial<Caballero>): Caballero {
    return this.caballerosService.updateCaballero(id, caballero);
  }

  @Delete(':id')
  deleteCaballero(@Param('id') id: number): Caballero {
    return this.caballerosService.deleteCaballero(id);
  }
}
