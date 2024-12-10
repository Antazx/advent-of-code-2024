import { OrderingRules, PagesToProduce } from ".";

export function main([orderingRules, pagesToProduce]: [
  OrderingRules,
  PagesToProduce
]): number {
  const validPages = pagesToProduce.filter((pages) =>
    isValidPageOrder(pages, orderingRules)
  );
  return calculateMiddleSum(validPages);
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
