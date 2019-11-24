
export const thousands = function thousands(num) {
  if (num) {
    num = num * 1
    return num.toLocaleString();
  }
}
