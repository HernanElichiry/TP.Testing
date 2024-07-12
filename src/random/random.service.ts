import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  findMaxNumber(array: number[]): number {
    if (!array || array.length === 0) {
      throw new Error('Array must not be empty.');
    }
    let max = array[0];
    for (let num of array) {
      if (num > max) {
        max = num;
      }
    }
    return max;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }



}
