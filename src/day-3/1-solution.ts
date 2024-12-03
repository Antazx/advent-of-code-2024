import { Multiplication } from ".";

const MUL_INSTRUCTION_REGEX = /mul\((\d{1,3}),(\d{1,3})\)/g;

export function main(input: string): number {
  const numbers: Multiplication[] = Array.from(
    input.matchAll(MUL_INSTRUCTION_REGEX),
    ([_, n1, n2]) => [parseInt(n1), parseInt(n2)]
  );

  return numbers.reduce((acc, [mul1, mul2]) => acc + mul1 * mul2, 0);
}
