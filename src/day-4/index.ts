import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

export type ElfWordSearch = string[][];

const input = readInput("src/day-4/input.txt");
const formattedInput = formatInput(input);

measureTime(() => firstSolution(formattedInput), "Day 4: first solution");
measureTime(() => secondSolution(formattedInput), "Day 4: second solution");

function formatInput(input: string): ElfWordSearch {
  const rows = input.split("\n");
  return rows.map((row) => row.split(""));
}
