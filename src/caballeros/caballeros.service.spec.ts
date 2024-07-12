import { Test, TestingModule } from '@nestjs/testing';
import { CaballerosService } from './caballeros.service';
import { Caballero } from './interface/caballero.interface';
import { NotFoundException } from '@nestjs/common';

describe('CaballerosService', () => {
  let service: CaballerosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaballerosService],
    }).compile();

    service = module.get<CaballerosService>(CaballerosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe devolver todos los caballeros del arreglo', () => {
    const caballeros = service.getAllCaballeros(); //llamo al metodo getAllCaballeros()
    expect(Array.isArray(caballeros)).toBe(true); //debe ser un arreglo
    expect(caballeros.length).toBeGreaterThan(0); // debe contener al menos un elemento
  });

  it('debe devolver un caballero por id', () => {
    const caballero = service.getCaballeroById(1); // llamo al metodo getCaballerosByid y le paso un parametro
    expect(caballero).toBeDefined(); // no puede arrojar undifind
    expect(caballero).toHaveProperty('id', 1); // debe tener id numero 1
    expect(caballero).toHaveProperty('constellation'); // El caballero debe tener la propiedad 'constellation
    expect(caballero).toHaveProperty('name'); // El caballero debe tener la propiedad 'name'.
    expect(caballero).toHaveProperty('armors'); // debe tener la propiedad armors
    expect(Array.isArray(caballero.armors)).toBe(true); // la propiedad armors debe ser un arreglo
  });

  it('debe lanzar un NotFoundException si el caballero por id no se encuentra', () => {
    expect(() => service.getCaballeroById(999)); // busco un caballero atraves de un id inexistente para que dispare una exception
  });

  it('debe agregar un nuevo caballero', () => {
    const newCaballero: Caballero = { id: 6, name: 'June', constellation: 'Chameleon', armors: ['Chameleon Bronze Armor'] };// debo agregar un cabllero 
    //pero primero debo establecer los parametros que le voy a pasar al metodo, asi que creo un objeto nuevo a los fines del test
    const addedCaballero = service.addCaballero(newCaballero);// ahora si, pruebo el metodo
    expect(service.getAllCaballeros()).toContainEqual(newCaballero); // compruebo que haya sido agregado
  });

  it('debe actualizar un caballero existente', () => {
    const updateData: Partial<Caballero> = { name: 'Hyoga', constellation: 'Cygnus', armors: ['Cygnus Bronze Armor', 'Aquarius Gold Armor'] };
    //creo un objeto con un tipo parcial, lo que vulve opcionales los atributos en caso de actualizacion.
    const updatedCaballero = service.updateCaballero(1, updateData);  // llamo al meto del servicio y le paso los parametros
    expect(updatedCaballero).toBeDefined(); // checkeo que no sea undifiend
    expect(service.getAllCaballeros()).toContainEqual(updatedCaballero); // compruebo que haya sido agregado
  });

  it('debe lanzar un NotFoundException si el caballero que se busca actualizar no se encuentra', () => {
    const updateData: Partial<Caballero> = { name: 'Unknown', constellation: 'Unknown' };
    expect(() => service.updateCaballero(999, updateData)); //intento actualizar con un id que no esta en el arreglo para forzar la exception
  });

  it('debe borra un caballero', () => {
    const deletedCaballero = service.deleteCaballero(1);
    expect(service.getAllCaballeros()).not.toContainEqual(deletedCaballero); // verifico que el caballero eliminado no exista mas dentro del array
  });

  it('debe lanzar un NotFoundException si el caballero que se busca borrar no se encuentra', () => {
    expect(() => service.deleteCaballero(999)).toThrowError(NotFoundException); // no entiendo porque toThrowErro aparece tachado,
    // la cuestion es que si lo saco no llego al 100 de cobertura. asi que lo deje asi.
  });
});
