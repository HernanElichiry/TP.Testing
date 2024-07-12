// src/caballeros/caballeros.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CaballerosController } from './caballeros.controller';
import { CaballerosService } from './caballeros.service';
import { Caballero } from './interface/caballero.interface';

describe('CaballerosController', () => {
  let controller: CaballerosController;
  let service: CaballerosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaballerosController],
      providers: [CaballerosService],
    }).compile();

    controller = module.get<CaballerosController>(CaballerosController);
    service = module.get<CaballerosService>(CaballerosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe devolver todos los  caballeros', () => {
    const result: Caballero[] = [
      { id: 1, name: 'Seiya', constellation: 'Pegasus', armors: ['Pegasus Bronze Armor', 'Sagittarius Gold Armor'] },
      { id: 2, name: 'Shiryu', constellation: 'Dragon', armors: ['Dragon Bronze Armor', 'Libra Gold Armor'] },
    ];
    jest.spyOn(service, 'getAllCaballeros').mockImplementation(() => result);

    expect(controller.getAllCaballeros()).toBe(result);
  });

  it('debe devolver un caballero por id', () => {
    const result: Caballero = { id: 1, name: 'Seiya', constellation: 'Pegasus', armors: ['Pegasus Bronze Armor', 'Sagittarius Gold Armor'] };
    jest.spyOn(service, 'getCaballeroById').mockImplementation(() => result); // simulo llamados a los metodos del servicio

    expect(controller.getCaballeroById(1)).toBe(result);
  });

  it('debe agregar un caballero nuevo', () => {
    const newCaballero: Caballero = { id: 3, name: 'Hyoga', constellation: 'Cygnus', armors: ['Cygnus Bronze Armor', 'Aquarius Gold Armor'] };
    jest.spyOn(service, 'addCaballero').mockImplementation(() => newCaballero);

    expect(controller.addCaballero(newCaballero)).toBe(newCaballero);
  });

  it('debe actualizar un caballero', () => {
    const updateData: Partial<Caballero> = { name: 'Hyoga', constellation: 'Cygnus', armors: ['Cygnus Bronze Armor', 'Aquarius Gold Armor'] };
    const updatedCaballero: Caballero = { id: 1, name: 'Hyoga', constellation: 'Cygnus', armors: ['Cygnus Bronze Armor', 'Aquarius Gold Armor'] };
    jest.spyOn(service, 'updateCaballero').mockImplementation(() => updatedCaballero); 

    expect(controller.updateCaballero(1, updateData)).toBe(updatedCaballero);
  });

  it('debe borrar un caballero', () => {
    const deletedCaballero: Caballero = { id: 1, name: 'Seiya', constellation: 'Pegasus', armors: ['Pegasus Bronze Armor', 'Sagittarius Gold Armor'] };
    jest.spyOn(service, 'deleteCaballero').mockImplementation(() => deletedCaballero);

    expect(controller.deleteCaballero(1)).toBe(deletedCaballero);
  });
});
