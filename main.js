const colors = require("colors");

const EventEmitter = require('events');
const arr = process.argv.slice(2);
const timer = arr[0];
let i = timer;

class Timer extends EventEmitter {
  start() {
    const interval = setInterval(() => {
      i--;
      this.emit('ready')
    }, 1000)
  }
}
const t = new Timer()

t.start()
t.on('ready', () => {
  let info = `Таймер аргумента ${timer}, до завершения работы осталось: ${i} секунд`
  console.log(info);
  if (i == 0) {
    console.log(colors.red(`Таймер ${timer} завершил свою работу`));
    // clearInterval(interval);
    process.exit();
  }
})

// arr.map((el) => {
//     let i = el;
//     const interval = setInterval(() => {
//       i--;
//       let info = `Таймер ${el}, до завершения работы осталось: ${i} секунд`
//       console.log(info);
//       if (i == 0) {
//         message();
//         clearInterval(interval);
//       }
//     }, 1000)
// })
// const message = () => {
//   console.log(colors.red(`Таймер завершил свою работу`));
// }