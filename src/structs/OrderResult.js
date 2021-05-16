class OrderResult
{
  constructor(items, iterationsCount, comparisonCount, isSorter) {
    this.items = items;
    this.iterationsCount = iterationsCount;
    this.comparisonCount = comparisonCount;
    this.isSorter = isSorter;
  }
}

export default OrderResult;