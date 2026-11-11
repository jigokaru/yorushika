// escape-lyrics.js
const fs = require('fs');
const raw = fs.readFileSync('raw-lyrics.txt', 'utf8'); // file bạn dán lời vào
const escaped = raw.replace(/\\/g, '\\\\').replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/"/g, '\\"');
const obj = {
  id: "Isana",
  title: "いさな",
  name: "ヨルシカ",
  album: "幻燈",
  lyrics: escaped
};
fs.writeFileSync('Isana.json', JSON.stringify(obj, null, 2), 'utf8');
console.log('Đã tạo Isana.json');
