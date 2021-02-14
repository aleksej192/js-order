import OrderResult from "@/structs/OrderResult";

class Bubble
{
  constructor(items) {
    this.items = items;
  }
  
  sort(byStep = false) {
    let arr = this.items;
    let iterationsCount = 0;
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        if (arr[j] > arr[j + 1]) {
          let swap = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = swap;
          iterationsCount++;
          if(byStep) {
            return new OrderResult(arr, iterationsCount, false)
          }
        }
      }
    }
    return new OrderResult(arr, iterationsCount, true);
  }
}

export default Bubble;