import OrderResult from "@/structs/OrderResult";
import BaseOrder from "@/orders/BaseOrder";

class Insert extends BaseOrder
{
  constructor(items) {
    super(items);

    this.name = 'Вставками';
  }

  sort(byStep = false, iterationsCount = 0, comparisonCount = 0) {
    let arr = this.items.map((i) => i);
    for (let i = 1, l = arr.length; i < l; i++) {
      const current = arr[i];
      let j = i;
      let arrOld = arr.map((i) => i);
      let isWhile = false;
      while (j > 0 && arr[j - 1] > current) {
        comparisonCount++;
        arr[j] = arr[j - 1];
        j--;
        if (byStep && comparisonCount > this.maxCounter) {
          this.result = new OrderResult(arrOld, iterationsCount, comparisonCount, this.isSorted(arrOld), current, arr[j]);
          this.maxCounter = comparisonCount;
          return this.result;
        }
        isWhile = true;
      }
      comparisonCount++;
      arr[j] = current;
      if (isWhile) {
        iterationsCount++;
      }
      if (byStep && comparisonCount > this.maxCounter) {
        this.result = new OrderResult(arr, iterationsCount, comparisonCount, this.isSorted(arr));
        this.maxCounter = comparisonCount;
        return this.result;
      }
    }
    return new OrderResult(arr, iterationsCount, comparisonCount, true);
  }
}

export default Insert;