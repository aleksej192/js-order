import OrderResult from "@/structs/OrderResult";

class Bubble
{
  constructor(items) {
    this.items = items.map((i) => i);

    this.name = 'Пузырьковая';

    this.result = new OrderResult(items, 0, 0, false);

    this.maxCounter = 0;

    this.resultIterationsCount = this.sort().iterationsCount;
    this.resultComparisonCount = this.sort().comparisonCount;
  }

  setItems(items) {
    this.items = items;
  }
  
  sort(byStep = false, iterationsCount = 0, comparisonCount = 0) {
    let arr = this.items.map((i) => i);
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        comparisonCount++;

        if (arr[j] > arr[j + 1]) {
          let swap = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = swap;
          iterationsCount++;
          if(byStep) {
            this.result = new OrderResult(arr, iterationsCount, comparisonCount, this.isSorted(arr))
          }
        }

        if(byStep && comparisonCount > this.maxCounter) {
          this.maxCounter = comparisonCount;
          this.result = new OrderResult(arr, iterationsCount, comparisonCount, this.isSorted(arr))
          return this.result;
        }

        if (this.isSorted(arr) && !byStep) {
          return new OrderResult(arr, iterationsCount, comparisonCount, true);
        }

      }
    }
    return new OrderResult(arr, iterationsCount, comparisonCount, true);
  }

  isSorted(arr) {
    return arr.every((v,i,a) => !i || a[i-1] <= v);
  }

  getResult() {
    return this.result;
  }
}

export default Bubble;