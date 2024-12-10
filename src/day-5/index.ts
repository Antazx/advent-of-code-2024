import { measureTime } from "../utils/measureTime";
import { readInput } from "../utils/readInput";
import { main as firstSolution } from "./1-solution";
import { main as secondSolution } from "./2-solution";

export type OrderingRules = {
  [key: number]: number[];
};

export type PagesToProduce = number[][];

const input = readInput("src/day-5/input.txt");
const formattedInput = formatInput(input);

measureTime(() => firstSolution(formattedInput), "Day 5: first solution");
measureTime(() => secondSolution(formattedInput), "Day 5: second solution");

function formatInput(input: string): [OrderingRules, PagesToProduce] {
  const [orderingRulesRaw, pagesToProduceRaw] = input.split("\n\n");
  const orderingRules: OrderingRules = {};
  const orderingRuleList = orderingRulesRaw.split("\n");

  for (const rule of orderingRuleList) {
    const [node, child] = rule.split("|").map(Number);
    if (child in orderingRules) {
      orderingRules[child] = [...orderingRules[child], node];
    } else {
      orderingRules[child] = [node];
    }
  }

  const pagesToProduce = pagesToProduceRaw
    .split("\n")
    .map((row) => row.split(",").map(Number));
  return [orderingRules, pagesToProduce];
}
