// compress.js
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const pkg = require('../package.json');

const compressFileName = pkg.name || 'dist';
const targetDir = path.resolve(__dirname, "../dist/source");  // 要压缩哪个文件
const outputDir = path.resolve(__dirname, "../dist/zip");  // 输出到哪个文件目录，默认为当前目录下

// 生成当前日期，用于ops部署
function getCurDate() {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = time.getDate();
  if (day < 10) day = `0${day}`;
  return `${year}${month}${day}`
}
const pkgVersion = pkg.version.replace(/\./g, '');
const fileName = `${compressFileName}_${getCurDate()}_${pkgVersion}.zip` // 压缩出来的文件名

function compressFile () {
  return new Promise((resolve, reject)=>{
    console.log('compressing...');
    if(!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir); // 如果文件夹不存在，则创建
    }
    let output = fs.createWriteStream(`${outputDir}/${fileName}`) // 创建⽂件写⼊流
    const archive = archiver('zip', { zlib: { level: 9 } }) // 设置压缩等级
    
    output.on('close', () => {
      resolve( console.log('compress done') )
    }).on('error', (err) => {
      reject( console.error('compress err:', err) )
    })
    
    archive.pipe(output)
    archive.directory(targetDir, false) // 存储⽬标⽂件 
    archive.finalize() // 完成归档
  })
}
compressFile();
