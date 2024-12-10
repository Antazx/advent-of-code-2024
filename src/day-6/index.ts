import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

const STARTING_CHAR = "^";
export type Map = string[][];
export type Direction = [number, number];
export type Position = [number, number];

const input = readInput("src/day-6/example.txt");
const formattedInput = formatInput(input);

measureTime(() => firstSolution(formattedInput), "Day 6: first solution");
measureTime(() => secondSolution(formattedInput), "Day 6: second solution");

function formatInput(input: string): {
  map: Map;
  initialPosition: Position;
} {
  const map: string[][] = [];
  const rows = input.split("\n");
  let initialPosition: [number, number] = [0, 0];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const currentRow: string[] = [];
    for (let columIndex = 0; columIndex < rows[rowIndex].length; columIndex++) {
      const currentChar = rows[rowIndex][columIndex];
      currentRow.push(currentChar);
      if (currentChar === STARTING_CHAR) initialPosition = [rowIndex, columIndex];
    }
    map.push(currentRow);
  }

  return {
    map,
    initialPosition,
  };
}
