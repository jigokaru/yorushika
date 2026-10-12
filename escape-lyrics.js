// escape-lyrics.js
const fs = require('fs');
const raw = fs.readFileSync('raw-lyrics.txt', 'utf8'); // file bạn dán lời vào
const escaped = raw.replace(/\\/g, '\\\\').replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/"/g, '\\"');
const obj = {
  id: "Chidori",
  title: "千鳥",
  lyrics: escaped
};
fs.writeFileSync('Chidori.json', JSON.stringify(obj, null, 2), 'utf8');
console.log('Đã tạo Chidori.json');
