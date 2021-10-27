function dup(arr) {
  return arr.concat(...arr);
}
//
console.log(dup([1, 2, 3, 4, 5]));
//
// const generateText = createBaseStrings(['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit']);
// // passe a list of words console.log(generateText(5));
// <--- 5 words
// output: ipsum dolor elit consectetur ipsum. console.log(generateText(20));// <--- 20 words // output: Lorem adipiscing adipiscing amet elit consectetur elit ipsum sit Lorem sit elit ipsum ipsum ipsum adipiscing Lorem Lorem amet consectetur.

// function createBaseStrings(arr) {
//   return (len) => {
//     let s = '';
//     for (let i = 0; i < len; i++) {
//       const randomWord = arr[Math.round(Math.random() * (arr.length - 1))];
//       if (i === 0) {
//         s += randomWord;
//       } else {
//         s += ' ' + randomWord;
//       }
//     }
//     return s;
//   }
// }
//
// console.log(createBaseStrings(['hello', 'world'])(5));


