import OrderResult from "@/structs/OrderResult";

class Insert {
  constructor(items) {
    this.items = items.map((i) => i);
    this.maxCounter = 0;
    this.name = 'Вставками';
    this.result = new OrderResult(items, 0, 0, false);

    this.resultIterationsCount = this.sort().iterationsCount;
    this.resultComparisonCount = this.sort().comparisonCount;
  }

  setItems(items) {
    this.items = items;
  }

  isSorted(arr) {
    return arr.every((v,i,a) => !i || a[i-1] <= v);
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
          this.result = new OrderResult(arrOld, iterationsCount, comparisonCount, this.isSorted(arrOld));
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

  getResult() {
    return this.result;
  }
}

export default Insert;