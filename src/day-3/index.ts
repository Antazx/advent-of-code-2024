import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

export type Multiplication = [number, number];

const input = readInput("src/day-3/input.txt");

measureTime(() => firstSolution(input), "Day 3: first solution");
measureTime(() => secondSolution(input), "Day 3: second solution");
