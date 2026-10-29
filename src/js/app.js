const DATA_PATH = "./data";

const app = document.getElementById("app");

let currentArtist = null;
let currentType = null;

/* =========================
   API
========================= */

async function getJSON(path) {

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Không thể tải: ${path}`);
    }

    return await response.json();
}

/* =========================
   RENDER MARKDOWN
========================= */

function renderLyrics(text) {

    if (!text) {
        return "Không có lời bài hát.";
    }

    return text

        .replace(/\\n/g, "\n")

        .replace(/^### (.*)$/gm,
            "<h3>$1</h3>"
        )

        .replace(/^## (.*)$/gm,
            "<h2>$1</h2>"
        )

        .replace(/^# (.*)$/gm,
            "<h1>$1</h1>"
        )

        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )

        .replace(/\n/g, "<br>");
}

/* =========================
   DANH SÁCH NGHỆ SĨ
========================= */

async function showArtists() {

    const artists = await getJSON(
        `${DATA_PATH}/artists/index.json`
    );

    app.innerHTML = `
        <section class="view">

            <h2>🎤 Nghệ sĩ / Nhóm nhạc</h2>

            <div id="artistList"></div>

        </section>
    `;

    const artistList =
        document.getElementById("artistList");

    artists.forEach(artist => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${artist.name}</h3>
        `;

        card.onclick = () => {

            currentArtist = artist;

            showArtistMenu();
        };

        artistList.appendChild(card);
    });
}

/* =========================
   MENU NGHỆ SĨ
========================= */

function showArtistMenu() {

    app.innerHTML = `
        <section class="view">

            <button id="backArtistList">
                ← Nghệ sĩ
            </button>

            <h2>${currentArtist.name}</h2>

            <div class="menu-grid">

                <div class="card" id="albumsBtn">
                    📀 Album
                </div>

                <div class="card" id="epsBtn">
                    💿 EP
                </div>

                <div class="card" id="singlesBtn">
                    🎵 Single
                </div>

            </div>

        </section>
    `;

    document
        .getElementById("backArtistList")
        .onclick = showArtists;

    document
        .getElementById("albumsBtn")
        .onclick = () =>
            showReleaseList("albums");

    document
        .getElementById("epsBtn")
        .onclick = () =>
            showReleaseList("eps");

    document
        .getElementById("singlesBtn")
        .onclick = () =>
            showReleaseList("singles");
}

/* =========================
   DANH SÁCH ALBUM / EP / SINGLE
========================= */

async function showReleaseList(type) {

    currentType = type;

    const releases = await getJSON(
        `${DATA_PATH}/artists/${currentArtist.id}/${type}.json`
    );

    app.innerHTML = `
        <section class="view">

            <button id="backArtist">
                ← Quay lại
            </button>

            <h2>${type.toUpperCase()}</h2>

            <div id="releaseList"></div>

        </section>
    `;

    document
        .getElementById("backArtist")
        .onclick = showArtistMenu;

    const releaseList =
        document.getElementById("releaseList");

    releases.forEach(release => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${release.title}</h3>
            <small>${release.year || ""}</small>
        `;

        card.onclick = () =>
            showRelease(release);

        releaseList.appendChild(card);
    });
}

/* =========================
   CHI TIẾT ALBUM / EP / SINGLE
========================= */

async function showRelease(release) {

    const data = await getJSON(
        `${DATA_PATH}/artists/${currentArtist.id}/${currentType}/${release.id}.json`
    );

    // Trường hợp Single chỉ có 1 bài
    if (currentType === "singles") {

        showLyrics(data, release);
        return;
    }

    app.innerHTML = `
        <section class="view">

            <button id="backRelease">
                ← Quay lại
            </button>

            <h2>${data.title}</h2>

            <div id="songList"></div>

        </section>
    `;

    document
        .getElementById("backRelease")
        .onclick = () =>
            showReleaseList(currentType);

    const songList =
        document.getElementById("songList");

    data.songs.forEach(song => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${song.title}</h3>
        `;

        card.onclick = () =>
            showLyrics(song, release);

        songList.appendChild(card);
    });
}
/* =========================
   HIỂN THỊ LỜI BÀI HÁT
========================= */

function showLyrics(song, release) {

    app.innerHTML = `
        <section class="view">

            <button id="backSongs">
                ← Quay lại
            </button>

            <h2>${song.title}</h2>

            <div class="lyrics">
                ${renderLyrics(song.lyrics)}
            </div>

        </section>
    `;

    document
        .getElementById("backSongs")
        .onclick = () =>
            showRelease(release);
}

/* =========================
   START
========================= */

showArtists();