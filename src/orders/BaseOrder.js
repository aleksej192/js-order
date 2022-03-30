import OrderResult from "@/structs/OrderResult";

class BaseOrder
{
  constructor(items)
  {
    this.items = items.map((i) => i);

    this.name = 'Пузырьковая';

    this.result = new OrderResult(items, 0, 0, false);

    this.maxCounter = 0;

    let sortResult = this.sort();

    this.resultIterationsCount = sortResult.iterationsCount;
    this.resultComparisonCount = sortResult.comparisonCount;
  }

  serialize() {
    return JSON.stringify({
      "items": this.items,
      "result_items": this.result.items,
      "result_iterations_count": this.result.iterationsCount,
      "result_comparison_count": this.result.comparisonCount,
      "result_is_sorter": this.result.isSorter,
      "result_active_element": this.result.activeElement,
      "result_compare_element": this.result.compareElement,
      "maxCounter": this.maxCounter,
      "resultIterationsCount": this.resultIterationsCount,
      "resultComparisonCount": this.resultComparisonCount,
    });
  }

  deserialize(str) {
    let obj = JSON.parse(str);
    this.items = obj.items;
    this.result = new OrderResult(
      obj.result_items,
      obj.result_iterations_count,
      obj.result_comparison_count,
      obj.result_is_sorter,
      obj.result_active_element,
      obj.result_compare_element
    );
    this.maxCounter = obj.maxCounter;
    this.resultIterationsCount = obj.resultIterationsCount;
    this.resultComparisonCount = obj.resultComparisonCount;
  }

  setItems(items) {
    this.items = items;
  }

  isSorted(arr) {
    return arr.every((v,i,a) => !i || a[i-1] <= v);
  }

  getResult() {
    return this.result;
  }
}

export default BaseOrder;