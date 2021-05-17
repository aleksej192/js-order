class OrderResult
{
  constructor(items, iterationsCount, comparisonCount, isSorter, activeElement, compareElement) {
    this.items = items;
    this.iterationsCount = iterationsCount;
    this.comparisonCount = comparisonCount;
    this.isSorter = isSorter;
    this.activeElement = activeElement;
    this.compareElement = compareElement;
  }
}

export default OrderResult;