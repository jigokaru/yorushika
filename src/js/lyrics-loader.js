// src/js/lyrics-loader.js
export async function loadIndex(indexUrl = '/data/lyrics/index.json') {
  const res = await fetch(indexUrl, {cache: "no-store"});
  if (!res.ok) throw new Error('Không tải được index.json');
  return res.json(); // trả về mảng tên file hoặc metadata
}

export async function loadSongJson(path) {
  const res = await fetch(path, {cache: "no-store"});
  if (!res.ok) throw new Error('Không tải được ' + path);
  return res.json();
}
