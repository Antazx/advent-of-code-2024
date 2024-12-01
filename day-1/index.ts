import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

export type LocationList = {
  firstColum: number[];
  secondColum: number[];
};

const input = readInput("./day-1/input.txt");
const formatedInput = formatInput(input);

measureTime(() => firstSolution(formatedInput), "Day 1: first solution");
measureTime(() => secondSolution(formatedInput), "Day 1: second solution");

function formatInput(input: string): LocationList {
  const firstColum: number[] = [];
  const secondColum: number[] = [];

  for (const row of input.split("\n")) {
    const [first, second] = row.split("   ");
    firstColum.push(parseInt(first));
    secondColum.push(parseInt(second));
  }

  return {
    firstColum,
    secondColum,
  };
}
