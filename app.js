// Danh sách mẫu (chỉ tiêu đề và đoạn trích ngắn). Thay bằng dữ liệu thật khi có API.
const songs = [
  { id: "s1", title: "ただ君に晴れ", excerpt: "空に浮かぶ雲を見ていた" },
  { id: "s2", title: "言って。", excerpt: "言葉はいつも足りなくて" },
  { id: "s3", title: "ヒッチコック", excerpt: "夜の街を歩くように" },
  { id: "s4", title: "春ひさぎ", excerpt: "春の匂いがする" }
];

const songListEl = document.getElementById('songList');
const searchEl = document.getElementById('search');
const modal = document.getElementById('lyricsModal');
const closeBtn = document.getElementById('closeBtn');
const lyricsTitle = document.getElementById('lyricsTitle');
const lyricsBody = document.getElementById('lyricsBody');
const openSourceBtn = document.getElementById('openSourceBtn');

function renderList(filter=""){
  songListEl.innerHTML = "";
  const filtered = songs.filter(s => (s.title + " " + s.excerpt).toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(s => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `<div class="song-title">${s.title}</div><div class="song-sub">${s.excerpt}</div>`;
    li.addEventListener('click', () => openLyrics(s));
    songListEl.appendChild(li);
  });
}

function openLyrics(song){
  lyricsTitle.textContent = song.title;
  lyricsBody.textContent = "Đang tải lời bài hát...";
  modal.classList.remove('hidden');

  // Cách 1: Gọi API nội bộ /api/lyrics?songId=...
  // Cách 2: Gọi dịch vụ lời bài hát (Musixmatch, Genius, v.v.) nếu bạn có khóa hợp lệ.
  // Dưới đây là ví dụ fetch giả lập. Thay bằng fetch thực tế khi tích hợp API.
  fetchLyricsFromServer(song.id)
    .then(text => {
      // **LƯU Ý BẢN QUYỀN**: text phải là nội dung bạn có quyền hiển thị.
      lyricsBody.textContent = text;
      openSourceBtn.style.display = 'inline-block';
      openSourceBtn.onclick = () => {
        // Nếu API trả về nguồn, mở nguồn đó
        window.open(text.sourceUrl || '#', '_blank');
      };
    })
    .catch(err => {
      lyricsBody.textContent = "Không thể tải lời. Vui lòng kiểm tra kết nối hoặc quyền truy cập API.";
      openSourceBtn.style.display = 'none';
    });
}

function closeModal(){
  modal.classList.add('hidden');
  lyricsTitle.textContent = "";
  lyricsBody.textContent = "";
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});

searchEl.addEventListener('input', (e) => renderList(e.target.value));

// Mô phỏng hàm fetch lyrics từ server
function fetchLyricsFromServer(songId){
  return new Promise((resolve, reject) => {
    // Mẫu: trả về đoạn trích ngắn (không phải toàn bộ lời)
    const sample = {
      s1: "空に浮かぶ雲を見ていた\n（...đoạn trích ngắn...）",
      s2: "言葉はいつも足りなくて\n（...đoạn trích ngắn...）",
      s3: "夜の街を歩くように\n（...đoạn trích ngắn...）",
      s4: "春の匂いがする\n（...đoạn trích ngắn...）"
    };
    setTimeout(() => {
      if(sample[songId]) resolve(sample[songId]);
      else reject(new Error("Not found"));
    }, 600);
  });
}

// Khởi tạo
renderList();
