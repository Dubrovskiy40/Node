const colors = require("colors");
const arr = process.argv.slice(2);
const start = arr[0];
const end = arr[1];
const primeNumbers = [];
const trafficLight = ['red', 'yellow', 'green']; 
let color = 0;
let resultNumber;

console.log(colors.green('Вывести простые числа из диапазона чисел между ' + start + ' и ' + end));

if (isNaN(start) || isNaN(end)) {
  console.log(colors.red('В заданном диапазоне не число!'))
} else {
    for (let i = start; i <= end; i++) {
      let flag = 1;
      for (let j = 2; (j <= i/2) && (flag == 1); j++) {
        if (i % j == 0) {
          flag = 0;
        }
      }
      if (flag == 1) {
        // console.log(colors.red(color));
        console.log(colors[trafficLight[color]](i));
        resultNumber = colors[trafficLight[color]](i); // это выводит абырвалг...
        primeNumbers.push(resultNumber);
        color += 1;
        
      }
      if (color >= 3) {
        color = 0
      }
    }
}
if (!primeNumbers.length) {
  console.log(colors.red('В заданном диапазоне простых чисел нет!'));
} else {
  console.log(primeNumbers);
}

process.exit(1);




