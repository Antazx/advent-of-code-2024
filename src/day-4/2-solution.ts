import { ElfWordSearch } from ".";

type SearchParams = {
  input: ElfWordSearch;
  rowIndex: number;
  columnIndex: number;
};

const CENTER_CHAR = "A";
const VALID_CHARS = ["M", "S"];

export function main(input: ElfWordSearch): number {
  let wordMatchCount = 0;

  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const currentRow = input[rowIndex];

    for (let columnIndex = 0; columnIndex < currentRow.length; columnIndex++) {
      const currentChar = currentRow[columnIndex];
      if (currentChar !== CENTER_CHAR) continue;

      const canSearchUp = rowIndex >= 1;
      const canSearchDown = rowIndex < input.length - 1;
      const canSearchLeft = columnIndex >= 1;
      const canSearchRight = columnIndex < currentRow.length - 1;

      const canLookAllDiagonals =
        canSearchUp && canSearchDown && canSearchLeft && canSearchRight;

      if (!canLookAllDiagonals) continue;

      const startingPoint = { input, rowIndex, columnIndex };

      if (isValidCross(startingPoint)) wordMatchCount++;
    }
  }
  return wordMatchCount;
}

function isValidCross(searchParams: SearchParams): boolean {
  const { input, rowIndex, columnIndex } = searchParams;

  const upperLeftChar = input[rowIndex - 1][columnIndex - 1];
  if (!VALID_CHARS.includes(upperLeftChar)) return false;

  const expectedLowerRightChar = VALID_CHARS.find(
    (char) => char !== upperLeftChar
  );
  const lowerRightChar = input[rowIndex + 1][columnIndex + 1];
  if (lowerRightChar !== expectedLowerRightChar) return false;

  const lowerLeftChar = input[rowIndex + 1][columnIndex - 1];
  if (!VALID_CHARS.includes(lowerLeftChar)) return false;

  const expectedUpperRightChar = VALID_CHARS.find(
    (char) => char !== lowerLeftChar
  );
  const upperRightChar = input[rowIndex - 1][columnIndex + 1];
  if (upperRightChar !== expectedUpperRightChar) return false;

  return true;
}
