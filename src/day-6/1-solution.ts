import { Direction, Map, Position } from ".";

const UP: Direction = [-1, 0];
const RIGHT: Direction = [0, 1];
const DOWN: Direction = [1, 0];
const LEFT: Direction = [0, -1];

const DIRECTIONS: Direction[] = [UP, RIGHT, DOWN, LEFT];
const TILES = {
  CHANGE_DIRECTION_CHAR: "#",
  ALREADY_VISITED_CHAR: "X",
} as const;

export function main({ map, initialPosition }: { map: Map; initialPosition: Position }) {
  let positionCount = 1;
  let directionIndex = 0;
  let currentPosition = initialPosition;

  while (true) {
    map[currentPosition[0]][currentPosition[1]] = TILES.ALREADY_VISITED_CHAR;
    const nextPosition = stepForward(map, directionIndex, currentPosition);
    if (nextPosition === null) break;

    const currentChar = map[nextPosition[0]][nextPosition[1]];
    if (currentChar === TILES.CHANGE_DIRECTION_CHAR) {
      directionIndex = getNextDirection(directionIndex);
    } else {
      if (currentChar !== TILES.ALREADY_VISITED_CHAR) positionCount++;
      currentPosition = nextPosition;
    }
  }

  return positionCount;
}

function isValidPosition(map: Map, position: Position): boolean {
  if (position[0] >= map.length || position[0] < 0) return false;
  if (position[1] >= map[0].length || position[1] < 0) return false;

  return true;
}

function stepForward(map: Map, directionIndex: number, initialPosition: Position): Position | null {
  const direction = DIRECTIONS[directionIndex];
  const nextPosition: Position = [initialPosition[0] + direction[0], initialPosition[1] + direction[1]];

  return isValidPosition(map, nextPosition) ? nextPosition : null;
}

function getNextDirection(currentDirectionIndex: number): number {
  const nextDirectionIndex = (currentDirectionIndex + 1) % DIRECTIONS.length;
  return nextDirectionIndex;
}
