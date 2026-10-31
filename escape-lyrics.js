// escape-lyrics.js
const fs = require('fs');
const raw = fs.readFileSync('raw-lyrics.txt', 'utf8'); // file bạn dán lời vào
const escaped = raw.replace(/\\/g, '\\\\').replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/"/g, '\\"');
const obj = {
  id: "ienai",
  title: "言えない",
  name: "緑黄色社会",
  album: "花になって",
  lyrics: escaped
};
fs.writeFileSync('ienai.json', JSON.stringify(obj, null, 2), 'utf8');
console.log('Đã tạo ienai.json');
