// src/js/lyrics-admin.js
// Sử dụng: mở file admin.html (không kèm ở đây) hoặc import vào trang admin.
// Hàm tạo file JSON và trigger download

export function createSongJsonAndDownload(meta) {
  // meta: {id,title,artist,album,year,excerpt,lyrics,source,sourceUrl}
  if (!meta.id || !meta.title) throw new Error('id và title bắt buộc');
  const filename = `${meta.id}.json`;
  const blob = new Blob([JSON.stringify(meta, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
