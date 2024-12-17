import { Grid } from './grid';
import { Point } from './point-2d';

export const findFill = (start: Point, filter: (point: Point) => boolean): Map<string, Point> => {
  const result = new Map<string, Point>();

  const queue = [start];

  while (queue.length > 0) {
    const next = queue.pop()!;
    if (filter(next)) {
      result.set(next.key, next);
      queue.push(...next.adjacents().filter((_) => !result.has(_.key)));
    }
  }

  return result;
};

export const findGridFill = <T>(grid: Grid<T>, start: Point, filter: (value: T, point: Point) => boolean, diagonals = false): Map<string, Point> => {
  const result = new Map<string, Point>();

  const queue = [start];

  while (queue.length > 0) {
    const next = queue.pop()!;
    if (filter(grid.getValue(next), next)) {
      result.set(next.key, next);
      queue.push(...next.adjacents(diagonals).filter((_) => grid.isValid(_) && !result.has(_.key)));
    }
  }

  return result;
};