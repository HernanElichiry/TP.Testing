import { Test, TestingModule } from '@nestjs/testing';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';

describe('RandomController', () => {
  let controller: RandomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomController],
      providers: [RandomService],
    }).compile();

    controller = module.get<RandomController>(RandomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe encontrar el numero mayor', () => {
    const result = controller.findMaxNumber('3,1,5,2,4');
    expect(result).toEqual(5);
  });

  it('debe validad un email', () => {
    const result = controller.validateEmail('test@example.com');
    expect(result).toEqual(true);
  });

  it('debe funcionar como un dado arrojando un numero al azar entre 1 y 6', () => {
    const result = controller.rollDice();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6); 
  });
});
