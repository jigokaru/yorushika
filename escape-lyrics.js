// escape-lyrics.js
const fs = require('fs');
const raw = fs.readFileSync('raw-lyrics.txt', 'utf8'); // file bạn dán lời vào
const escaped = raw.replace(/\\/g, '\\\\').replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/"/g, '\\"');
const obj = {
  id: "Liar",
  title: "嘘月",
  name: "ヨルシカ",
  //album: "創作",
  ep: "創作",
  lyrics: escaped
};
fs.writeFileSync('Liar.json', JSON.stringify(obj, null, 2), 'utf8');
console.log('Đã tạo Liar.json');
