import { ElfWordSearch } from ".";

type SearchParams = {
  input: ElfWordSearch;
  rowIndex: number;
  columnIndex: number;
};

type Direction = {
  rowDelta: number;
  colDelta: number;
};

const WORD = ["X", "M", "A", "S"];

const DIRECTIONS: Record<string, Direction> = {
  right: { rowDelta: 0, colDelta: 1 },
  left: { rowDelta: 0, colDelta: -1 },
  up: { rowDelta: -1, colDelta: 0 },
  down: { rowDelta: 1, colDelta: 0 },
  rightDown: { rowDelta: 1, colDelta: 1 },
  leftDown: { rowDelta: 1, colDelta: -1 },
  rightUp: { rowDelta: -1, colDelta: 1 },
  leftUp: { rowDelta: -1, colDelta: -1 },
};

export function main(input: ElfWordSearch): number {
  let wordMatchCount = 0;

  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const currentRow = input[rowIndex];

    for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
      const currentChar = currentRow[columnIndex];
      if (currentChar !== WORD[0]) continue;

      const canSearchUp = rowIndex >= WORD.length - 1;
      const canSearchDown = rowIndex <= input.length - WORD.length;
      const canSearchLeft = columnIndex >= WORD.length - 1;
      const canSearchRight = columnIndex <= currentRow.length - WORD.length;

      const startingPoint = { input, rowIndex, columnIndex };

      if (canSearchRight && searchInDirection(startingPoint, DIRECTIONS.right))
        wordMatchCount++;

      if (canSearchLeft && searchInDirection(startingPoint, DIRECTIONS.left))
        wordMatchCount++;

      if (canSearchUp && searchInDirection(startingPoint, DIRECTIONS.up))
        wordMatchCount++;

      if (canSearchDown && searchInDirection(startingPoint, DIRECTIONS.down))
        wordMatchCount++;

      if (
        canSearchRight &&
        canSearchDown &&
        searchInDirection(startingPoint, DIRECTIONS.rightDown)
      )
        wordMatchCount++;

      if (
        canSearchRight &&
        canSearchUp &&
        searchInDirection(startingPoint, DIRECTIONS.rightUp)
      )
        wordMatchCount++;

      if (
        canSearchLeft &&
        canSearchDown &&
        searchInDirection(startingPoint, DIRECTIONS.leftDown)
      )
        wordMatchCount++;

      if (
        canSearchLeft &&
        canSearchUp &&
        searchInDirection(startingPoint, DIRECTIONS.leftUp)
      )
        wordMatchCount++;
    }
  }

  return wordMatchCount;
}

function searchInDirection(
  searchParams: SearchParams,
  direction: Direction
): boolean {
  const { input, rowIndex, columnIndex } = searchParams;
  const { rowDelta, colDelta } = direction;

  let matchesCount = 1;
  let currentWordIndex = 1;
  let currentRowIndex = rowIndex;
  let currentColumnIndex = columnIndex;

  while (matchesCount < WORD.length) {
    currentRowIndex += rowDelta;
    currentColumnIndex += colDelta;

    const currentChar = input[currentRowIndex][currentColumnIndex];
    const currentWordChar = WORD[currentWordIndex];

    if (currentChar !== currentWordChar) return false;

    matchesCount++;
    currentWordIndex++;
  }

  return true;
}
