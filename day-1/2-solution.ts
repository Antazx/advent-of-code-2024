import { LocationList } from ".";

export function main({ firstColum, secondColum }: LocationList): number {
  let totalSimilarityScore = 0;
  const secondColumCount = countLocations(secondColum);
  for (const location of firstColum) {
    const similarityScore = location * (secondColumCount[location] || 0);
    totalSimilarityScore += similarityScore;
  }

  return totalSimilarityScore;
}

function countLocations(list: number[]): Record<number, number> {
  const count: Record<number, number> = {};
  for (const location of list) {
    if (count[location]) {
      count[location]++;
    } else {
      count[location] = 1;
    }
  }
  return count;
}
