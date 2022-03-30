import OrderResult from "@/structs/OrderResult";
import BaseOrder from "@/orders/BaseOrder";

class Bubble extends BaseOrder
{
  constructor(items) {
    super(items);

    this.name = 'Пузырьковая';
  }
  
  sort(byStep = false) {
    let arr = this.items.map((i) => i),
        iterationsCount = 0,
        comparisonCount = 0;

    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        comparisonCount++;

        if (arr[j] > arr[j + 1]) {
          iterationsCount++;
          if(byStep) {
            this.result = new OrderResult(
              arr,
              iterationsCount,
              comparisonCount,
              this.isSorted(arr),
              arr[j + 1],
              arr[j + 2] || arr[0]
            )
          }
          let swap = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = swap;
        }

        if(byStep && comparisonCount > this.maxCounter) {
          this.maxCounter = comparisonCount;
          this.result = new OrderResult(arr, iterationsCount, comparisonCount, this.isSorted(arr), arr[j + 1], arr[j + 2] || arr[0])
          return this.result;
        }

        if (this.isSorted(arr) && !byStep) {
          return new OrderResult(arr, iterationsCount, comparisonCount, true);
        }

      }
    }
    return new OrderResult(arr, iterationsCount, comparisonCount, true);
  }
}

export default Bubble;