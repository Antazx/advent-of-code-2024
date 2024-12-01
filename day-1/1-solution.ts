import { readInput } from "../utils/readInput";
import { quicksort } from "../utils/quicksort";

type LocationList = {
  firstColum: number[];
  secondColum: number[];
};

const input = readInput("./day-1/input.txt");

async function main(input: string) {
  const { firstColum, secondColum } = formatInput(input);

  const sortedFirstColum = quicksort(firstColum);
  const sortedSecondColum = quicksort(secondColum);

  let totalDistance = 0;

  for (let i = 0; i < sortedFirstColum.length; i++) {
    const distance = Math.abs(sortedFirstColum[i] - sortedSecondColum[i]);
    totalDistance += distance;
  }

  return totalDistance;
}

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

main(input);
