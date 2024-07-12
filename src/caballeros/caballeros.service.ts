import { Injectable, NotFoundException } from '@nestjs/common';
import { Caballero } from './interface/caballero.interface';

@Injectable()
export class CaballerosService {
  private caballeros: Caballero[] = [
    { id: 1, name: 'Seiya', constellation: 'Pegasus', armors: ['Pegasus Bronze Armor', 'Sagittarius Gold Armor'] },
    { id: 2, name: 'Shiryu', constellation: 'Dragon', armors: ['Dragon Bronze Armor', 'Libra Gold Armor'] },
    { id: 3, name: 'Hyoga', constellation: 'Cygnus', armors: ['Cygnus Bronze Armor', 'Aquarius Gold Armor'] },
    { id: 4, name: 'Shun', constellation: 'Andromeda', armors: ['Andromeda Bronze Armor', 'Virgo Gold Armor'] },
    { id: 5, name: 'Ikki', constellation: 'Phoenix', armors: ['Phoenix Bronze Armor', 'Leo Gold Armor'] },
  ];

  getAllCaballeros(): Caballero[] {
    return this.caballeros;
  }

  getCaballeroById(id: number): Caballero {
    const caballero = this.caballeros.find(c => c.id === id);
    if (!caballero) {
      throw new NotFoundException('Caballero not found');
    }
    return caballero;
  }

  addCaballero(caballero: Caballero): Caballero {
    this.caballeros.push(caballero);
    return caballero;
  }

  updateCaballero(id: number, caballero: Partial<Caballero>): Caballero {
    const existingCaballero = this.getCaballeroById(id);
    const updatedCaballero = { ...existingCaballero, ...caballero };
    this.caballeros = this.caballeros.map(c => c.id === id ? updatedCaballero : c);
    return updatedCaballero;
  }

  deleteCaballero(id: number): Caballero {
    const caballero = this.getCaballeroById(id);
    this.caballeros = this.caballeros.filter(c => c.id !== id);
    return caballero;
  }
}
