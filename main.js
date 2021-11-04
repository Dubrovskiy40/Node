
// * Возможность передавать путь к директории в программу. 
// Это актуально, когда вы не хотите покидать текущую директорию, 
// но вам необходимо просмотреть файл, находящийся в другом месте;
// * В содержимом директории переходить во вложенные каталоги;
// * При чтении файлов искать в них заданную строку или паттерн.

const fs = require('fs')
const inquirer = require('inquirer');
const path = require('path');

const isDirectory = dirName => fs.lstatSync(dirName).isDirectory();
const directoryList = dirName => fs.readdirSync(dirName);
const executionDir = process.cwd();

const getData = executionDir => inquirer.prompt([
   {
      name: 'fileName',
      type: 'list',
      message: `Выберете файл/папку для чтения: `,
      choices: directoryList(executionDir)
   }
])
   .then(answer => {
      executionDir = path.resolve(executionDir, answer.fileName);

      if (isDirectory(executionDir)) { // если директория, запускаем рекурсию
         getData(executionDir)
      } else {
         const data = fs.readFileSync(executionDir, 'utf-8');
         console.log(data);
         inquirer.prompt([{ // запрос строки для поиска в файле
            name: 'stringName',
            type: 'input',
            message: `Введите строку для поиска в текущем файле: `
         }])
            .then(answer => {
               console.log(`Вы ввели: ${answer.stringName}`)
               const inquiry = answer.stringName;
               
               if (inquiry == '') {
                  console.log('null');
               } else {
                  const regExp = new RegExp(inquiry, 'igm');
                  console.log(data.match(regExp));
               }
            })
            .catch(error => console.log(error));
      }
   })

   getData(executionDir);
