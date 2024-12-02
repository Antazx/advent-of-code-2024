import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

export type Level = number;
export type Report = Level[];

const input = readInput("src/day-2/input.txt");
const formattedInput = formatInput(input);

measureTime(() => firstSolution(formattedInput), "Day 2: first solution");
measureTime(() => secondSolution(formattedInput), "Day 2: second solution");

function formatInput(input: string): Report[] {
  const reports = input.split("\n");
  return reports.map((report) =>
    report.split(" ").map((level) => parseInt(level))
  );
}
