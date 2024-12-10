import { OrderingRules, PagesToProduce } from ".";

export function main([orderingRules, pagesToProduce]: [
  OrderingRules,
  PagesToProduce
]): number {
  const inalidvalidPages = pagesToProduce.filter(
    (pages) => !isValidPageOrder(pages, orderingRules)
  );

  const orderedPages = inalidvalidPages
    .map((pages) => validateAndOrderPages(pages, orderingRules))
    .filter((pages) => pages !== null);

  return calculateMiddleSum(orderedPages);
}

function isValidPageOrder(
  pages: number[],
  orderingRules: OrderingRules
): boolean {
  for (let currentIndex = 1; currentIndex < pages.length; currentIndex++) {
    const previousPage = pages[currentIndex - 1];
    const currentPage = pages[currentIndex];

    if (orderingRules[previousPage]?.includes(currentPage)) return false;

    if (
      currentPage in orderingRules &&
      !orderingRules[currentPage].includes(previousPage)
    )
      return false;
  }

  return true;
}

function calculateMiddleSum(pages: number[][]): number {
  return pages.map(getMiddleNumber).reduce((sum, current) => sum + current, 0);
}

function getMiddleNumber(pages: number[]): number {
  const middleIndex = Math.floor(pages.length / 2);
  return pages[middleIndex];
}

function validateAndOrderPages(
  pages: number[],
  orderingRules: OrderingRules
): number[] | null {
  const currentPages = [...pages];
  let isValid = true;

  for (
    let windowIndex = 0;
    windowIndex < currentPages.length - 1;
    windowIndex++
  ) {
    for (
      let pageIndex = 0;
      pageIndex < currentPages.length - windowIndex - 1;
      pageIndex++
    ) {
      const currentPage = currentPages[pageIndex];
      const nextPage = currentPages[pageIndex + 1];

      if (orderingRules[currentPage]?.includes(nextPage)) {
        currentPages[pageIndex] = nextPage;
        currentPages[pageIndex + 1] = currentPage;
      }

      if (
        orderingRules[currentPages[pageIndex]]?.includes(
          currentPages[pageIndex + 1]
        )
      ) {
        isValid = false;
        break;
      }

      if (
        currentPages[pageIndex + 1] in orderingRules &&
        !orderingRules[currentPages[pageIndex + 1]].includes(
          currentPages[pageIndex]
        )
      ) {
        isValid = false;
        break;
      }
    }

    if (!isValid) break;
  }

  return isValid ? currentPages : null;
}
