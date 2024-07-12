
import { Test, TestingModule } from '@nestjs/testing';
import { RandomService } from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomService],
    }).compile();

    service = module.get<RandomService>(RandomService);
  });

  it('debe encontrar en numero maximo en un array', () => {
    const array = [3, 1, 5, 2, 4];
    expect(service.findMaxNumber(array)).toEqual(5);
  });

  it('debe validar el email', () => {
    expect(service.validateEmail('test@example.com')).toEqual(true);
    expect(service.validateEmail('invalidemail')).toEqual(false);
  });

  it('debe devolver un numero entre 1 y 6', () => {
    const result = service.rollDice();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  it('debe arrojar un error si esta vacio', () => {
    const emptyArray = [];
    expect(() => service.findMaxNumber(emptyArray)).toThrowError('Array must not be empty.');
  });
});

//Porque usar funcion flecha en estos casos de exceptions ? 
/* En resumen, () => service.findMaxNumber(emptyArray) se utiliza para encapsular la llamada a service.findMaxNumber(emptyArray) 
dentro de una función que Jest puede ejecutar y evaluar. 
Esto permite a Jest interceptar cualquier excepción que se produzca durante 
la ejecución de service.findMaxNumber(emptyArray) y verificar que se arroje la excepción esperada 
(toThrowError('Array must not be empty.')).*/