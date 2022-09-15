export const formatPrice = (price) => {
  if (typeof price === 'number') {
    if (price === 0) return 'مجاناً';

    let str = price.toString();
    let n = str.length;
    let count = 0;
    let ans = '';
    while (n) {
      if (count === 3) {
        count = 0;
        ans += ',';
      }
      ans += str[--n];
      count++;
    }

    return ans.split('').reverse().join('');
  }
  // console.error('incorrect type. expected number, but found ', typeof price);
  return '';
};
