import { Report } from ".";

const MAX_LEVEL_DIFFERENCE = 3;

export function main(input: Report[]) {
  const safeReports = input.filter(isReportSafeWithProblemDamper);
  return safeReports.length;
}

function isReportSafeWithProblemDamper(report: Report): boolean {
  if (isReportSafe(report)) return true;

  return report.some((_, index) => {
    const modifiedReport = removeLevel(report, index);
    return isReportSafe(modifiedReport);
  });
}

function removeLevel(report: Report, index: number): Report {
  return [...report.slice(0, index), ...report.slice(index + 1)];
}

function isReportSafe(report: Report): boolean {
  if (report.length < 2) return false;

  let isValidIncreasing = true;
  let isValidDecreasing = true;

  for (
    let levelIndex = 0;
    levelIndex < report.length - 1 && (isValidIncreasing || isValidDecreasing);
    levelIndex++
  ) {
    const [current, next] = [report[levelIndex], report[levelIndex + 1]];

    if (areInvalidLevels(current, next)) {
      return false;
    }

    if (current > next) {
      isValidIncreasing = false;
    } else {
      isValidDecreasing = false;
    }
  }

  return isValidIncreasing || isValidDecreasing;
}

function areInvalidLevels(current: number, next: number): boolean {
  if (current === next) return true;

  const difference = Math.abs(current - next);
  return difference > MAX_LEVEL_DIFFERENCE;
}
