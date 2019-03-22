function doMath(num1, num2, operator){
   var calc = {
       '*': () => num1 * num2,
       '+': () => num1 + num2,
       '-': () => num1 - num2,
       '/': () => num1 / num2
   };
   calc['x'] = calc['X'] = calc['*'];
   return calc[operator]();
}

console.log(process.argv);

var n1 = parseInt(process.argv[2]);
var op = process.argv[3];
var n2 = parseInt(process.argv[4]);


var answer = doMath(n1,n2, op);
console.log(answer);

