// src/js/app.js
import { loadIndex, loadSongJson } from './lyrics-loader.js';

const songListEl = document.getElementById('songList');
const searchEl = document.getElementById('search');
const modal = document.getElementById('lyricsModal');
const closeBtn = document.getElementById('closeBtn');
const lyricsTitle = document.getElementById('lyricsTitle');
const lyricsBody = document.getElementById('lyricsBody');
const openSourceBtn = document.getElementById('openSourceBtn');

let songsMeta = []; // {id,title,excerpt,path,...}

async function init() {
  try {
    const index = await loadIndex('/data/lyrics/index.json');
    // index is array of filenames
    const promises = index.map(fn => loadSongJson(`/data/lyrics/${fn}`).catch(e => null));
    const results = await Promise.all(promises);
    songsMeta = results.filter(Boolean).map(s => ({ ...s, path: `/data/lyrics/${s.id || s.title ? s.id + '.json' : ''}` }));
    // If JSON includes id, we assume file path is /data/lyrics/<filename> from index; to be safe, attach filename:
    songsMeta = results.filter(Boolean).map((s, i) => ({ ...s, path: `/data/lyrics/${index[i]}` }));
    renderList();
  } catch (err) {
    songListEl.innerHTML = `<li class="song-item">Không tải được danh sách bài hát.</li>`;
    console.error(err);
  }
}

function renderList(filter = '') {
  songListEl.innerHTML = '';
  const filtered = songsMeta.filter(s => (s.title + ' ' + (s.excerpt||'')).toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) {
    songListEl.innerHTML = `<li class="song-item">Không tìm thấy bài hát.</li>`;
    return;
  }
  filtered.forEach(s => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `<div class="song-title">${s.title}</div><div class="song-sub">${s.excerpt || ''}</div>`;
    li.addEventListener('click', () => openLyrics(s));
    songListEl.appendChild(li);
  });
}

async function openLyrics(songMeta) {
  lyricsTitle.textContent = songMeta.title;
  lyricsBody.textContent = 'Đang tải...';
  openSourceBtn.href = '#';

  modal.classList.remove('hidden');

  try {
    // Tải JSON bài hát
    const data = await loadSongJson(songMeta.path);

    // Lấy nội dung lời
    const display = data.lyrics || data.excerpt || 'Không có lời hiển thị.';

    const html = display.replace(/\\n/g, '<br>');
    lyricsBody.innerHTML = html;


    // Nút nguồn
    if (data.sourceUrl) {
      openSourceBtn.href = data.sourceUrl;
      openSourceBtn.style.display = 'inline-block';
    } else {
      openSourceBtn.style.display = 'none';
    }

  } catch (err) {
    lyricsBody.textContent = 'Không thể tải lời bài hát.';
    openSourceBtn.style.display = 'none';
    console.error(err);
  }
}



function closeModal() {
  modal.classList.add('hidden');
  lyricsTitle.textContent = '';
  lyricsBody.textContent = '';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
searchEl.addEventListener('input', (e) => renderList(e.target.value));

init();
