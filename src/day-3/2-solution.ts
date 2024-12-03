import { Multiplication } from ".";

const MUL_INSTRUCTION_REGEX = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
const DO_INSTRUCTION = "do()";
const DONT_INSTRUCTION = "don't()";

export function main(input: string): number {
  const instructions = Array.from(input.matchAll(MUL_INSTRUCTION_REGEX));
  let enabled = true;
  const enabledNumbers: Multiplication[] = [];

  for (const [, instruction] of instructions) {
    if (instruction === DO_INSTRUCTION) {
      enabled = true;
      continue;
    } else if (instruction === DONT_INSTRUCTION) {
      enabled = false;
      continue;
    }

    if (!enabled) continue;
    enabledNumbers.push(parseMultiplication(instruction));
  }

  return enabledNumbers.reduce((acc, [mul1, mul2]) => acc + mul1 * mul2, 0);
}

function parseMultiplication(instruction: string): Multiplication {
  const numbers = instruction
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((n) => parseInt(n));

  if (numbers.length !== 2 || numbers.some(isNaN)) {
    throw new Error(`Invalid multiplication instruction: ${instruction}`);
  }

  return [numbers[0], numbers[1]];
}
