// random.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get('max/:array')
  findMaxNumber(@Param('array') array: string): number {
    const parsedArray = array.split(',').map(num => parseInt(num));
    return this.randomService.findMaxNumber(parsedArray);
  }

  @Get('validate/:email')
  validateEmail(@Param('email') email: string): boolean {
    return this.randomService.validateEmail(email);
  }

  @Get('roll-dice')
  rollDice(): number {
    return this.randomService.rollDice();
  }
}
