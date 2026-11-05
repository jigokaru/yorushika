// escape-lyrics.js
const fs = require('fs');
const raw = fs.readFileSync('raw-lyrics.txt', 'utf8'); // file bạn dán lời vào
const escaped = raw.replace(/\\/g, '\\\\').replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/"/g, '\\"');
const obj = {
  id: "shayou",
  title: "斜陽",
  name: "ヨルシカ",
  album: "盗作",
  lyrics: escaped
};
fs.writeFileSync('shayou.json', JSON.stringify(obj, null, 2), 'utf8');
console.log('Đã tạo shayou.json');
