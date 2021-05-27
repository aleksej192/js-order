export const func = {
  isUnique: function (array, item) {
    let t_array = array.map((i) => i);
    t_array.push(+item);
    return new Set(t_array).size === t_array.length
  }
}