import OrderResult from "@/structs/OrderResult";

class Insert {
  constructor(items) {
    this.items = items.map((i) => i);

    this.resultIterationsCount = this.sort().iterationsCount;

    this.items = items;

    this.name = 'Вставками';
  }

  setItems(items) {
    this.items = items;
  }

  isSorted(arr) {
    return arr.every((v,i,a) => !i || a[i-1] <= v);
  }

  sort(byStep = false, iterationsCount = 0) {
    let isWhile = false;
    for (let i = 1, l = this.items.length; i < l; i++) {
      isWhile = false
      const current = this.items[i];
      let j = i;
      while (j > 0 && this.items[j - 1] > current) {
        this.items[j] = this.items[j - 1];
        j--;
        isWhile = true;
      }
      this.items[j] = current;
      if (isWhile) {
        iterationsCount++;
      }
      if (byStep && isWhile) {
        return new OrderResult(this.items, iterationsCount, this.isSorted(this.items));
      }
    }
    return new OrderResult(this.items, iterationsCount, true);
  }
}

export default Insert;