import { Report } from ".";

const MAX_LEVEL_DIFFERENCE = 3;

export function main(input: Report[]) {
  const safeReports = input.filter(isReportSafe);
  return safeReports.length;
}

function isReportSafe(report: Report): boolean {
  if (report.length < 2) return false;

  const [first, second] = report;
  const shouldIncrease = first < second;

  return report.every((current, index) => {
    if (index === report.length - 1) return true;
    const next = report[index + 1];
    return isValidProgression(current, next, shouldIncrease);
  });
}

function isValidProgression(
  current: number,
  next: number,
  shouldIncrease: boolean
): boolean {
  if (areInvalidLevels(current, next)) return false;

  const isActuallyIncreasing = current < next;
  return isActuallyIncreasing === shouldIncrease;
}

function areInvalidLevels(current: number, next: number): boolean {
  if (current === next) return true;

  const difference = Math.abs(current - next);
  return difference > MAX_LEVEL_DIFFERENCE;
}
