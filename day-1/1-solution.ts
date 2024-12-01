import { quicksort } from "../utils/quicksort";
import { LocationList } from ".";

export function main({ firstColum, secondColum }: LocationList): number {
  const sortedFirstColum = quicksort(firstColum);
  const sortedSecondColum = quicksort(secondColum);

  let totalDistance = 0;

  for (let i = 0; i < sortedFirstColum.length; i++) {
    const distance = Math.abs(sortedFirstColum[i] - sortedSecondColum[i]);
    totalDistance += distance;
  }

  return totalDistance;
}
